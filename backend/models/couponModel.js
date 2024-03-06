// Coupon Schema
const mongoose = require('mongoose')
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  validFrom: Date,
  validUntil: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    unique:true,
    required:true
  },
});




const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
