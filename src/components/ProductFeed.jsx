import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ShopByCategory from './ShopByCategory';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function ProduceFeed() {
  const products = useSelector(state => state.products);
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
