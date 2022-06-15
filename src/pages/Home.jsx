import { addProducts } from '../stores/productsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import ProductFeed from '../components/ProductFeed';
import useProgress from '../hooks/useProgress';
import ShopByCategory from '../components/ShopByCategory';
import axios from '../config/axiosConfig';
import { Divider } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Home() {
  const dispatch = useDispatch();
  const progress = useProgress();
  const products = useSelector(state => state.products);
  // if (products.length === 0) progress.start();
  // else progress.finish();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(`/products`);
        dispatch(addProducts(data.products));
      } catch (err) {
        console.log('Error', err.stack);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-2xl">
        <Banner />

        <section className="-my-60">
          {/* <p className="font-semibold text-xl md:text-2xl my-2 mx-7 text-gray-500">
            Shop by Category
          </p> */}
          <ShopByCategory />
          <p className="text-yellow-500 hover:text-yellow-600 my-2 text-xl text-right mx-6">
            <Link to="/categories" className="cursor-pointer">
              View All
              <ArrowRightAltIcon />
            </Link>
          </p>

          <ProductFeed />
        </section>
      </main>
    </>
  );
}

export default Home;
