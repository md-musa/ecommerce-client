import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ShopByCategory from './ShopByCategory';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';

function ProduceFeed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(`/products`);
        // console.log(data);
        // console.log('products', data);
        setProducts(data);
      } catch (err) {
        console.log('Error', err.stack);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <div className="grid rounded-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {products.map(item => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </>
  );
}

export default ProduceFeed;
