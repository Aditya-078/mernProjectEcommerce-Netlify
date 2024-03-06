const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  addAddress,
  updateAddress,
  removeAddress,
  selectAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// Routes for address management
router
  .route("/address")
  .post(isAuthenticatedUser, addAddress);

router
  .route("/address/:addressId")
  .put(isAuthenticatedUser, updateAddress)
  .delete(isAuthenticatedUser, removeAddress);

router
  .route("/address/select/:addressId")
  .put(isAuthenticatedUser, selectAddress);

  router
  .route("/wishlist/add/:productId") // Route for adding to wishlist
  .post(isAuthenticatedUser, addToWishlist);

router
  .route("/wishlist/remove/:productId") // Route for removing from wishlist
  .delete(isAuthenticatedUser, removeFromWishlist);

router
  .route("/wishlist") // Route for getting wishlist items
  .get(isAuthenticatedUser, getWishlist);

module.exports = router;
