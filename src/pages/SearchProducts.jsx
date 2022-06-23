import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
function SearchProducts() {
  const { title } = useParams();
  console.log(title);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
    const searchItems = async () => {
      try {
        const { data } = await axios.get(`/products/search?term=${title}`);
        console.log('data', data);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    searchItems();
  }, [title]);

  return (
    <>
      <Navbar />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}

export default SearchProducts;
