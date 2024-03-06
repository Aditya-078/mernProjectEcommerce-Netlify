const express = require('express');
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  validateCoupon
} = require('../controllers/couponController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


// Create a new coupon
router.post('/admin/coupons', isAuthenticatedUser, authorizeRoles('admin'), createCoupon);

// Get all coupons
router.get('/admin/coupons', isAuthenticatedUser, authorizeRoles('admin'), getAllCoupons);

// Update a specific coupon by ID
router.put('/admin/coupons/:id', isAuthenticatedUser, authorizeRoles('admin'), updateCoupon);

// Delete a specific coupon by ID
router.delete('/admin/coupons/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteCoupon);

router.post('/coupons/validate', validateCoupon);

module.exports = router;
