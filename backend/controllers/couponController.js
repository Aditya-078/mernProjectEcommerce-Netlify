// controllers/couponController.js

const Coupon = require('../models/couponModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createCoupon = catchAsyncErrors(async (req, res) => {
  const { name , code, discountPercentage, validFrom, validUntil, isActive } = req.body;

  // Check if a coupon with the same code already exists
  const existingCoupon = await Coupon.findOne({ code });
if (existingCoupon) {
  return res.status(400).json({
    success: false,
    message: 'Duplicate coupon code entered' 
  });
}

  const coupon = await Coupon.create({
    name,
    code,
    discountPercentage,
    validFrom,
    validUntil,
    isActive
  });

  res.status(201).json({
    success: true,
    coupon
  });
});


exports.getAllCoupons = catchAsyncErrors(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    success: true,
    coupons
  });
});

exports.updateCoupon = catchAsyncErrors(async (req, res) => {
  let coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    coupon
  });
});

exports.deleteCoupon = catchAsyncErrors(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }

  await coupon.remove();
  res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully'
  });
});

exports.validateCoupon = catchAsyncErrors(async (req, res) => {
  const {code } = req.body;
  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }

  const currentDate = new Date();
  const isActive = coupon.isActive;
  const isValidDateRange = (!coupon.validFrom || coupon.validFrom <= currentDate) &&
  (!coupon.validUntil || coupon.validUntil >= currentDate);

  if (!isActive || !isValidDateRange) {
    return res.status(400).json({ success: false, message: 'Coupon is not valid' });
  }

  res.status(200).json({
    success: true,
    message: 'Coupon is valid',
    discountPercentage: coupon.discountPercentage
  });
});