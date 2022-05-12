import React, { useEffect, useState } from 'react';
import { MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import useAuth from '../hooks/useAuth';
import axios from '../services/axiosConfig';
import SearchedProduct from './SearchedProduct';

function Navbar() {
  const cartItems = useSelector(state => state.cart.products);
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    async function searchProduct() {
      try {
        const response = await axios.get(
          `/products/search?q=${productName}&limit=7`
        );
        setSearchedProducts(response.data.products);
      } catch (err) {
        console.log('error --> ', err);
      }
    }
    searchProduct();
  }, [productName]);

  return (
    <header className="header shadow-md mt-2">
      <div className="relative blur-bg flex items-center">
        {/* Top nav */}
        <div className="w-1/5 flex items-center flex-grow sm:flex-grow-0 md:mx-6">
          <Link to="/">
            <img
              className="md:w-12 w-[50px] object-contain cursor-pointer"
              src="https://lh3.googleusercontent.com/9Xn1Bno4lPDWM3u0qnNoyNumOjOX9faCWyGbUO8gX60iPJ4v8Oxg5b4gHKeCK1W2sUOm=h200"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="w-3/5 relative h-10 flex rounded-md items-center cursor-pointer flex-grow justify-center">
          <div className="md:w-4/6 w-full flex shadow-md border bg-white rounded-full px-1 items-center">
            <select className="hidden md:inline h-auto outline-none cursor-pointer hover:bg-gray-300 shadow-sm text-gray-500 bg-gray-200 py-1 rounded-full px-2">
              <option>All categories</option>
            </select>

            <input
              type="text"
              className="py-2 px-4 w-full flex-grow rounded-l-md focus:outline-none"
              placeholder="Search..."
              value={productName}
              onChange={e => setProductName(e.target.value)}
              onKeyDown={e => {
                if (e.key == 'Enter') {
                  navigate(`/product/search/${productName}`);
                  setProductName('');
                }
              }}
            />

            <SearchIcon
              onClick={() => {
                navigate(`/product/search/${productName}`);
                setProductName('');
              }}
              style={{ height: '32px', width: '32px' }}
              className="hidden md:inline search-icon bg-[#f95a59] mr-1 p-1 ring-2 ring-[#f95a5994] text-white rounded-full"
            />
          </div>
          {productName && (
            <div className="absolute w-full md:w-3/6 top-10 px-3 py-2 bg-gray-100">
              <div className="text-right">
                <CloseIcon
                  onClick={() => setProductName('')}
                  className=" bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600"
                />
              </div>
              {searchedProducts.map(item => (
                <SearchedProduct
                  key={item.id}
                  setProductName={setProductName}
                  product={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-auto flex items-center justify-end text-xs md:text-base space-x-2 md:space-x-6 md:mx-6 whitespace-nowrap">
          <Link to="/cart">
            <div className="relative space-x-2 cursor-pointer hover:underline flex items-center justify-center">
              <p className="absolute text-[#f14443] h-4 w-4 top-0 right-0 bg-[#f4c8c8] rounded-full md:right-8 flex items-center justify-center">
                <span className="">{cartItems.length}</span>
              </p>
              <ShoppingCartIcon className="h-8 text-[#f95a59d4]" />
              <p className="font-semibold text-gray-600 hidden md:inline">
                Cart
              </p>
            </div>
          </Link>
          <div className="cursor-pointer hover:underline flex items-center relative">
            {auth.user ? (
              <div className="flex space-x-3 items-center">
                <Avatar
                  className="ring-2 ring-[#f95a5994] mx-1"
                  alt="Md. Musa"
                  src={auth.user.image}
                />
              </div>
            ) : (
              <Link to="/signIn">
                <button className="bg-[#951df7] hover:bg-[#9332e3] px-2 md:px-6 py-1 mx-1 md:mx-4 outline-none cursor-pointer text-white font-semibold rounded-full shadow-md">
                  Log in <ArrowRightAltIcon />
                </button>
              </Link>
            )}
            {!auth.user && (
              <div className="hidden md:inline">
                <FiberManualRecordIcon
                  className="text-red-500 absolute -right-0 -top-2"
                  style={{ width: '12px' }}
                />
                <button className="bg-gray-100 hover:bg-gray-200 border px-6 py-1 outline-none cursor-pointer font-semibold rounded-full shadow-md">
                  Help
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="relative -z-10 blur-bg flex justify-between py-2 pl-6 space-x-4 font-semibold text-gray-600">
        <div className="flex">
          <p className="link mx-2">
            <Link to="/categories">
              <span className="ml-2">All</span>
            </Link>
          </p>
          <p className="link mx-2">Prime Video</p>
          <p className="link mx-2">Categories</p>
          <p className="link mx-2">Electronics</p>
          <p className="link mx-2 hidden lg:inline">Food & Delivery</p>
          <p className="link mx-2 hidden lg:inline">Health & Personal Care</p>
        </div>
        <div className="hidden md:flex mx-2">
          <BookmarkBorderIcon className="mx-4 text-[#f95a59d4] cursor-pointer" />
          <PersonOutlineIcon className="mx-4 text-[#f95a59d4] cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
