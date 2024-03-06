import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCategory } from "../../actions/productAction";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./CategoryPage.css"; 

const CategoryPage = ({ match, item }) => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsByCategory(match.params.category));
  }, [dispatch, match.params.category]);

  return (
    <Fragment>
      <MetaData title={`Products - ${match.params.category}`} />
      <div className="container">
        <h1 className="category-title">{match.params.category}</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="product-list">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="no-products-message">No products found in this category</p>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CategoryPage;
