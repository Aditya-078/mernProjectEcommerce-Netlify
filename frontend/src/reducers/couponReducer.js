// couponReducer.js

import {
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  VALIDATE_COUPON_REQUEST,
  VALIDATE_COUPON_SUCCESS,
  VALIDATE_COUPON_FAIL,
  // other constants
} from '../constants/couponConstants';

export const couponCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_CREATE_REQUEST:
      return { loading: true };
    case COUPON_CREATE_SUCCESS:
      return { loading: false, success: true, coupon: action.payload };
      case COUPON_CREATE_FAIL:
      return { loading: false, error: action.payload };
      default:
      return state;
      }
      };
      
      export const couponListReducer = (state = { coupons: [] }, action) => {
      switch (action.type) {
      case COUPON_LIST_REQUEST:
      return { loading: true };
      case COUPON_LIST_SUCCESS:
      return { loading: false, coupons: action.payload };
      case COUPON_LIST_FAIL:
      return { loading: false, error: action.payload };
      default:
      return state;
      }
      };
      const initialState = {
        loading: false,
        success: false,
        coupon: null, // You can store the validated coupon data here
        error: null,
      };
      
      // Create a new reducer function for coupon validation
      export const couponValidateReducer = (state = initialState, action) => {
        switch (action.type) {
          case VALIDATE_COUPON_REQUEST:
            return { ...state, loading: true };
          case VALIDATE_COUPON_SUCCESS:
            return { ...state, loading: false, success: true, coupon: action.payload };
          case VALIDATE_COUPON_FAIL:
            return { ...state, loading: false, error: action.payload };
          default:
            return state;
        }
      };
