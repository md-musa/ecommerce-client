import { addProducts } from '../stores/productsSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import ProductFeed from '../components/ProductFeed';
import useProgress from '../hooks/useProgress';
import ShopByCategory from '../components/ShopByCategory';
import { Divider } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();
  const progress = useProgress();
  // const products = useSelector(state => state.products);

  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    async function getBestSellingProducts() {
      try {
        const { data } = await axios.get(`/products/bestSellingProducts`);
        console.log(data);
        setBestSellingProducts(data);
      } catch (err) {
        console.log('Error', err.stack);
      }
    }
    getBestSellingProducts();
  }, []);
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-2xl">
        <Banner />

        <section className="">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg lg:text-2xl font-sans mx-10 font-semibold text-[#1e0135]">
                Popular Categories
              </p>
            </div>
            <div>
              <p className="text-yellow-500 hover:text-yellow-600 my-2 text-xl text-right mx-6">
                <Link to="/categories" className="cursor-pointer">
                  View All
                  <ArrowRightAltIcon />
                </Link>
              </p>
            </div>
          </div>
          <ShopByCategory />

          {/* Best selling products */}
          <div className="py-4 my-4 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg lg:text-2xl font-sans mx-10 font-semibold text-[#1e0135]">
                  Best Selling Products
                </p>
              </div>
              <div>
                <p className="text-yellow-500 hover:text-yellow-600 my-2 text-xl text-right mx-6">
                  <Link to="/categories" className="cursor-pointer">
                    View All
                    <ArrowRightAltIcon />
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2">
              {bestSellingProducts.map(product => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-sans mx-10 font-semibold text-[#1e0135]">
                Just For You
              </p>
            </div>
            <div>
              <p className="text-yellow-500 hover:text-yellow-600 my-2 text-xl text-right mx-6">
                <Link to="/categories" className="cursor-pointer">
                  View All
                  <ArrowRightAltIcon />
                </Link>
              </p>
            </div>
          </div>
          <ProductFeed />
        </section>
      </main>
    </>
  );
}

export default Home;
