// couponActions.js

import axios from 'axios';
import {
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DELETE_FAIL,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_REQUEST,
  COUPON_UPDATE_FAIL,
  COUPON_UPDATE_REQUEST,
  COUPON_UPDATE_SUCCESS,
  COUPON_VALIDATE_SUCCESS,
  COUPON_VALIDATE_REQUEST,
  COUPON_VALIDATE_FAIL


  // other constants
} from '../constants/couponConstants';

export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_CREATE_REQUEST });
    const { data } = await axios.post('/api/v1/admin/coupons', couponData);
    dispatch({ type: COUPON_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response); 
    dispatch({
      type: COUPON_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: COUPON_LIST_REQUEST });
    const { data } = await axios.get('/api/v1/admin/coupons');
    dispatch({ type: COUPON_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COUPON_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateCoupon = (id, couponData) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/coupons/${id}`, couponData);
    dispatch({ type: COUPON_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COUPON_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DELETE_REQUEST });
    await axios.delete(`/api/v1/admin/coupons/${id}`);
    dispatch({ type: COUPON_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: COUPON_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// In your couponAction.js file

export const validateCoupon = (couponCode) => (dispatch) => {
  dispatch({ type: COUPON_VALIDATE_REQUEST }); // Add this line to handle loading state
  return axios
    .post('/api/v1/coupons/validate', { code: couponCode })
    .then((response) => {
      dispatch({
        type: COUPON_VALIDATE_SUCCESS,
        payload: response.data,
      });
      return response.data; // Resolve the promise with the data
    })
    .catch((error) => {
      const errorMessage = error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message;
      dispatch({
        type: COUPON_VALIDATE_FAIL,
        payload: errorMessage,
      });
      return Promise.reject(errorMessage); // Reject the promise with the error
    });
};


// Add more actions for listing, updating, deleting, etc.
