import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
} from "../constants/wishlistConstants";

export const wishlistReducer = (
  state = { wishlistItems: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const newItem = action.payload;
      const isItemInWishlist = state.wishlistItems.find(
        (item) => item.product === newItem.product
      );

      if (isItemInWishlist) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((item) =>
            item.product === newItem.product ? newItem : item
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, newItem],
        };
      }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistItems: action.payload,
      };

    case GET_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
