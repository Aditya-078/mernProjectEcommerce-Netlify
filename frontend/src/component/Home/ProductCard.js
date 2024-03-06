import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa"; // Import heart icon
import './ProductCard.css';
import { addToWishlist } from "../../actions/wishlistAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(product._id));
    window.location.reload();
    window.prompt("sometext","defaultText");
  };

  return (
    <div className="productCard">
      <Link to={`/product/${product._id}`} data-content={product.name}>
        <div className="imgBox">
          <img className="productImage" src={product.images[0].url} alt={product.name} />
        </div>
        <div className="contentBox">
          <h3>{product.name}</h3>
          <div>
            <Rating {...options} />
            <span className="productCardSpan">{`(${product.numOfReviews} Reviews)`}</span>
          </div>
          <span className="price">{`₹${product.price}`}</span>
          <div>
          <Link className="buy" to={`/product/${product._id}`}>Buy Now</Link>

          <button className="wishlistButton buy" onClick={addToWishlistHandler} title="Add to Wishlist">
            <FaHeart /><p></p>
          </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
