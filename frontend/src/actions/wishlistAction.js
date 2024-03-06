import axios from "axios";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
} from "../constants/wishlistConstants";

// Add to Wishlist
export const addToWishlist = (productId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/api/v1/wishlist/add/${productId}`); // Updated route path

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: data,
    });

    // Update local storage if needed
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
  } catch (error) {
    console.error(error);
  }
};

// Remove from Wishlist
export const removeFromWishlist = (productId) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/v1/wishlist/remove/${productId}`); // Updated route path

    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: productId,
    });

    // Update local storage if needed
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
  } catch (error) {
    console.error(error);
  }
};

// Get Wishlist
export const getWishlist = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/wishlist"); // Updated route path

    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload: data.wishlist,
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};