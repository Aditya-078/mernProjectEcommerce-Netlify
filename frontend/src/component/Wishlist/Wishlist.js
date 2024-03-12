import React, { Fragment,  useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaTrash } from "react-icons/fa";
import { removeFromWishlist, getWishlist } from "../../actions/wishlistAction";
import "./Wishlist.css"; // Import the CSS file for styling

const Wishlist = ({item}) => {
  const dispatch = useDispatch();
  const { loading, error, wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-page-title">
        <FaHeart /> Wishlist
      </h2>
      {loading ? (
        <p> Loading.. </p>
      ) : error ? (
        <h4 variant="error">{error}</h4>
      ) : wishlistItems?.length === 0 ? (
        <h4>Your wishlist is empty. <Link to="/products" className="link-back-to-shopping">Go back to shopping</Link></h4>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Remove</p>
            </div>

            {wishlistItems.map((item) => (
              <div className="cartContainer" key={item._id}>
                <div className="wishlist-item">
                  <Link to={`/product/${item._id}`} className="wishlist-item-image">
                  <img src={item.images[0].url} alt={item.name} />
                  </Link>
                  <Link to={`/product/${item._id}`} className="wishlist-item-name">
                    {item.name}
                  </Link>
                </div>
                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-item-remove"
                    onClick={() => removeFromWishlistHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Wishlist;
