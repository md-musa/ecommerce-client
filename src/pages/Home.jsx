import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from 'react-query';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import ProductFeed from '../components/ProductFeed';
import ShopByCategory from '../components/ShopByCategory';
import ProductCard from '../components/ProductCard';
import { getBestSellingProducts } from '../services/product';
import indicateLoadingProgress from '../utils/loadingProgress';

function Home() {
  const { isLoading, data: bestSellingProducts } = useQuery(
    'product',
    getBestSellingProducts
  );

  indicateLoadingProgress(isLoading);

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

            <div className="grid md:grid-cols-3 lg:grid-cols-5">
              {bestSellingProducts &&
                bestSellingProducts.map(product => (
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
