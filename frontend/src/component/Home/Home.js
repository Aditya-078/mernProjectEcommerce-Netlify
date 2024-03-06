import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct, getProductsByCategory } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";



const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, products } = useSelector((state) => state.products);

  const categories = ["Laptop", "Footwear", "Clothing", "Accessories"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const handleCategoryClick = (category) => {
    // Dispatch action to get products by category
    dispatch(getProductsByCategory(category));
    // Redirect to category page
    history.push(`/api/v1/product/category/${category}`);
  };


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="INFISPEC ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Infispec Ecommerce</p>
            <h1>TAKE YOUR BUSSINESS TO THE NEXT LEVEL</h1>
            <a href="#container">
              <button>
                Explore 
              </button>
            </a>
          </div>

          <h1 className="homeHeading">Featured Products</h1>

          <div className="container" id="container">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          <div className="categorysection">
            <h1>Categories</h1>
            <div className="category-buttons">
              {categories.map((category) => (
                <button key={category} onClick={() => handleCategoryClick(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
