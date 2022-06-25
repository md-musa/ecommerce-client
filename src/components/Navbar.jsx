import React, { useEffect, useState, useTransition } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import useAuth from '../hooks/useAuth';
import SearchedProduct from '../components/SearchedProduct';
import AccountMenu from './AccountMenu';
import BasicMenu from './BasicMenu';
import { getCategories } from '../services/category';
import { useQuery } from 'react-query';
import { addItemsToCart } from '../stores/cartSlice';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { getCartItems } from '../services/cart';
import { getProductBySearching } from '../services/product';

function Navbar() {
  const { user } = useAuth();
  // console.log('nav user=> ', user.token);
  const navigate = useNavigate();
  const [searchTerm, setTitle] = useState('');
  const [isPending, startTransition] = useTransition();

  const { isLoading, data: products } = useQuery(['search', searchTerm], () =>
    getProductBySearching(searchTerm)
  );

  const handleInstantSearch = e => {
    startTransition(() => {
      setTitle(e.target.value);
    });
  };

  const { data: categories } = useQuery('category', getCategories);

  const [expand, setExpand] = useState(false);
  function expandSearchBar() {
    setExpand(true);
  }

  const { data: cart } = useQuery('cart', getCartItems);

  return (
    <header className="header shadow-md mt-2">
      <div className="relative blur-bg flex items-center">
        {/* Top nav */}
        {!expand && (
          <div className="w-1/5 flex items-center flex-grow sm:flex-grow-0 md:mx-6">
            <Link to="/">
              <img
                className="md:w-12 w-[50px] object-contain cursor-pointer"
                src="https://lh3.googleusercontent.com/9Xn1Bno4lPDWM3u0qnNoyNumOjOX9faCWyGbUO8gX60iPJ4v8Oxg5b4gHKeCK1W2sUOm=h200"
                alt="logo"
              />
            </Link>
          </div>
        )}

        {/* Search */}
        <div className="w-3/5 relative h-10 flex rounded-md items-center cursor-pointer flex-grow justify-center">
          <div
            // style={expand && { borderRadius: '15px', margin: 'auto 15px' }}
            className=" w-full md:w-4/6  rounded-full overflow-hidden flex shadow-xl border-2 border-gray-200 bg-white px-1 items-center"
          >
            <select className="hidden md:inline h-auto outline-none cursor-pointer hover:bg-gray-300 shadow-sm text-gray-500 bg-gray-200 py-1 rounded-full px-2">
              <option>All categories</option>
            </select>

            <input
              type="text"
              className="py-2 px-4 w-full flex-grow rounded-l-md focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onClick={expandSearchBar}
              onChange={handleInstantSearch}
              onKeyDown={e => {
                if (e.key == 'Enter') {
                  navigate(`/products/search/${searchTerm}`);
                  setTitle('');
                }
              }}
            />

            <SearchIcon
              onClick={() => {
                navigate(`/products/search/${searchTerm}`);
                setTitle('');
              }}
              style={{ height: '32px', width: '32px' }}
              className="hidden md:inline search-icon bg-[#f95a59] mr-1 p-1 ring-2 ring-[#f95a5994] text-white rounded-full"
            />
          </div>
          {searchTerm && (
            <div className="absolute w-full md:w-3/6 top-10 px-3 py-2 bg-gray-100">
              <div className="text-right">
                <CloseIcon
                  onClick={() => setTitle('')}
                  className=" bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600"
                />
              </div>
              {products?.map(item => (
                <SearchedProduct
                  key={item._id}
                  setProductName={setTitle}
                  product={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        {!expand && (
          <div className="w-auto flex items-center justify-end text-xs md:text-base space-x-2 md:space-x-6 md:mx-6 whitespace-nowrap">
            <Link to="/cart">
              <div className="relative space-x-2 cursor-pointer hover:underline flex items-center justify-center">
                {user && (
                  <p className="absolute text-[#f14443] h-4 w-4 top-0 right-0 bg-[#eed2d2] rounded-full font-semibold p-[2px] md:right-0 z-10 flex items-center justify-center">
                    <span className="">{cart?.products?.length || 0}</span>
                  </p>
                )}
                <IconButton>
                  <ShoppingCartIcon className="h-8 text-[#f95a59d4]" />
                </IconButton>
              </div>
            </Link>
            <div className="cursor-pointer hover:underline flex items-center relative">
              {user ? (
                <AccountMenu />
              ) : (
                <Link to="/signIn">
                  <button className="bg-[#951df7] hover:bg-[#9332e3] px-2 md:px-6 py-1 mx-1 md:mx-4 outline-none cursor-pointer text-white font-semibold rounded-full shadow-md">
                    Log in <ArrowRightAltIcon />
                  </button>
                </Link>
              )}
              {!user && (
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
        )}
      </div>

      {/* bottom nav -z-10*/}
      <div className="relative flex justify-between py-2 pl-6 space-x-4 font-semibold text-gray-600">
        <div className="flex">
          {categories?.map(category => (
            <BasicMenu category={category} key={category._id} />
          ))}
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
