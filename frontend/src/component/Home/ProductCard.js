import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`} data-content={product.name}>
      <div className="imgBox">
        <img className="productImage" src={product.images[0].url} alt={product.name} />
      </div>
      <div className="contentBox">
        <h3>{product.name}</h3>
        <div>
          <Rating {...options} />{" "}
          <span className="productCardSpan">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span className="price">{`₹${product.price}`}</span>
        <Link className="buy" to={`/product/${product._id}`}>
          Buy Now
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;
