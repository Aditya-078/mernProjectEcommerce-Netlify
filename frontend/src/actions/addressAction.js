import axios from 'axios';
import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_REQUEST,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,
  SELECT_ADDRESS,
} from '../constants/addressConstants';

export const addAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    // Make API call to add address
    const { data } = await axios.post('/api/v1/address', addressData);

    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data.address });
  } catch (error) {
    dispatch({ type: ADD_ADDRESS_FAIL, payload: error.response.data.message });
  }
};

export const removeAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ADDRESS_REQUEST });

    // Make API call to remove address
    await axios.delete(`/api/v1/address/${addressId}`);

    dispatch({ type: REMOVE_ADDRESS_SUCCESS, payload: addressId });
  } catch (error) {
    dispatch({ type: REMOVE_ADDRESS_FAIL, payload: error.response.data.message });
  }
};

export const updateAddress = (addressId, updatedAddressData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });

    // Make API call to update address
    const { data } = await axios.put(`/api/v1/address/${addressId}`, updatedAddressData);

    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data.address });
  } catch (error) {
    dispatch({ type: UPDATE_ADDRESS_FAIL, payload: error.response.data.message });
  }
};

export const getAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADDRESSES_REQUEST });

    // Make API call to get addresses
    const { data } = await axios.get('/api/v1/addresses');

    dispatch({ type: GET_ADDRESSES_SUCCESS, payload: data.addresses });
  } catch (error) {
    dispatch({ type: GET_ADDRESSES_FAIL, payload: error.response.data.message });
  }
};

export const selectAddress = (addressId) => (dispatch) => {
  dispatch({ type: SELECT_ADDRESS, payload: addressId });
};