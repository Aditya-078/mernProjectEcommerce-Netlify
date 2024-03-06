// Category.js
import React, { Fragment, useState } from 'react';

const Category = ({ categories, subcategoriesMap, onSelectCategory, onSelectSubcategory }) => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  return (
    <Fragment>
      <div>
        <label>Choose Category:</label>
        <select onChange={(e) => onSelectCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
      </div>

      {category && subcategoriesMap[category] && (
        <div>
          <label>Choose Subcategory:</label>
          <select onChange={(e) => onSelectSubcategory(e.target.value)}>
            <option value="">Select Subcategory</option>
            {subcategoriesMap[category].map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      )}
    </Fragment>
  );
};

export default Category;
