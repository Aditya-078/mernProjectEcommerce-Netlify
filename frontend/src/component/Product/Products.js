import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import Button from "@material-ui/core/Button";
import "./Products.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  // Add more categories if needed
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, subcategory, ratings));
  }, [dispatch, keyword, currentPage, price, category, subcategory, ratings, alert, error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubcategory(""); // Reset subcategory when category changes
    // Fetch subcategories for the new category
    const fetchedSubcategories = getSubcategories(event.target.value);
    setSubcategories(fetchedSubcategories);
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  const getSubcategories = (category) => {
    // This function should fetch subcategories based on the category
    // For now, it returns hardcoded values
    switch (category) {
      case "Laptop":
        return ["Dell", "Asus", "HP"];
      case "Footwear":
        return ["Adidas", "Nike", "Puma"];
      // Add more cases as needed
      default:
        return [];
    }
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setPrice([0, 25000]);
    setCategory("");
    setSubcategory("");
    setRatings(0);
    dispatch(getProduct(keyword, 1, [0, 25000], "", "", 0));
  };

  return (
    
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <div className="filterBox">
          <fieldset>
            <Typography component="legend">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />
            </fieldset>
            
            <select value={category} onChange={handleCategoryChange} className="categorySelect">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            

            {category && subcategories.length > 0 && (
              <Fragment>
                
                <select value={subcategory} onChange={handleSubcategoryChange} className="subcategorySelect">
                  <option value="">All Subcategories</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </Fragment>
            )}

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            <Button variant="contained" color="secondary" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>

          <div className="products">
          <h2 className="productsHeading" style={{ position: 'relative', zIndex: 100 }}>Products</h2>

            
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product}  />
            ))}
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
