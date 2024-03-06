const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Product = require("../models/productModel");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, lastname, email, password } = req.body;

  const user = await User.create({
    name,
    lastname,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: '1d',
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// Add Address
exports.addAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, pinCode, phoneNo } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  user.addresses.push({ address, city, state, country, pinCode, phoneNo });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address added successfully",
  });
});

// Update Address
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const { address, city, state, country, pinCode, phoneNo } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const existingAddress = user.addresses.id(addressId);

  if (!existingAddress) {
    return next(new ErrorHander("Address not found", 404));
  }

  existingAddress.address = address;
  existingAddress.city = city;
  existingAddress.state = state;
  existingAddress.country = country;
  existingAddress.pinCode = pinCode;
  existingAddress.phoneNo = phoneNo;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
  });
});

// Remove Address
exports.removeAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const existingAddress = user.addresses.id(addressId);

  if (!existingAddress) {
    return next(new ErrorHander("Address not found", 404));
  }

  existingAddress.remove();

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address removed successfully",
  });
});

// Select Address
exports.selectAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const existingAddress = user.addresses.id(addressId);

  if (!existingAddress) {
    return next(new ErrorHander("Address not found", 404));
  }

  user.selectedAddressId = addressId;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address selected successfully",
  });
});






// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    lastname:req.body.lastname,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 300,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});


exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;


  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHander(`Product not found with ID: ${productId}`, 404));
  }

  // Check if the user already has the product in the wishlist
  const user = await User.findById(req.user.id);
  if (user.wishlist.includes(productId)) {
    return next(new ErrorHander("Product already in the wishlist", 400));
  }

  // Add the product to the user's wishlist
  user.wishlist.push(productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist successfully",
  });
});

// Remove product from user's wishlist
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;

  // Check if the user has the product in the wishlist
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(productId)) {
    return next(new ErrorHander("Product not found in the wishlist", 404));
  }

  // Remove the product from the user's wishlist
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist successfully",
  });
});

// Get user's wishlist
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'wishlist',
    select: 'name images' // Adjust the fields you want to retrieve from the products
  });

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});