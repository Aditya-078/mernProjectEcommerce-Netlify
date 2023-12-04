import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Decore",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [subcategories, setSubcategories] = useState([]);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Fetch subcategories when the category changes
    if (category) {
      // Simulate fetching subcategories based on the selected category
      const fetchedSubcategories = getSubcategories(category);
      setSubcategories(fetchedSubcategories);
    }

    dispatch(getProduct(keyword, currentPage, price, category, subcategory, ratings));
  }, [dispatch, keyword, currentPage, price, category, subcategory, ratings, alert, error]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSubcategory("");
  };

  const getSubcategories = (selectedCategory) => {
    // Replace this with logic to fetch subcategories based on the selected category
    // For now, return an empty array
    switch (selectedCategory) {
      case "Laptop":
        return ["Dell", "asus"];
      case "Footwear":
        return ["Adidas", "Nike"];
      // Add more cases for other categories
      default:
        return [];
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={150000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((cat) => (
                <li
                  className={`category-link ${category === cat && 'active'}`}
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            {category && subcategories.length > 0 && (
              <Fragment>
                <Typography>Subcategories</Typography>
                <ul className="subcategoryBox">
                  {subcategories.map((subcat) => (
                    <li
                      className={`subcategory-link ${subcategory === subcat && 'active'}`}
                      key={subcat}
                      onClick={() => setSubcategory(subcat)}
                    >
                      {subcat}
                    </li>
                  ))}
                  {subcategory && (
                    <li className={`subcategory-link active`} onClick={() => setSubcategory("")}>
                      {subcategory}
                    </li>
                  )}
                </ul>
              </Fragment>
            )}

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;