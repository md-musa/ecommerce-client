import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import useProgress from '../hooks/useProgress';
import axios from '../services/axiosConfig';

function SearchProducts() {
  const progress = useProgress();
  const { title } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
    const searchItems = async () => {
      try {
        const { data } = await axios.get(`/products/search?q=${title}`);
        console.log('data', data);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    searchItems();
  }, [title]);

  if (!products.length) progress.start();
  else progress.finish();
  return (
    <>
      <Navbar />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
}

export default SearchProducts;
