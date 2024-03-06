import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const LargeCSVProcessor = ({ setCategories, setSubcategoriesMap }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./AmazonCategories(1).csv'); 
        const text = await response.text();

        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        const categories = parsedData.meta.fields.filter((field) => field !== 'Mai Category');
        const subcategoriesMap = {};

        categories.forEach((category) => {
          const subcategories = parsedData.data
            .filter((row) => row['Mai Category'] === category)
            .map((row) => row[category])
            .filter((subcategory) => subcategory);

          subcategoriesMap[category] = subcategories;
        });

        setCategories(categories);
        setSubcategoriesMap(subcategoriesMap);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, [setCategories, setSubcategoriesMap]);


  return null;
};

export default LargeCSVProcessor;
