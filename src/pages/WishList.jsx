import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Empty from '../components/Empty';
import ProductForCategory from '../components/ProductForCategory';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function WishList() {
  const [wishList, setWishList] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  console.log('wishlist=> ', wishList);

  useEffect(() => {
    const getWishLists = async () => {
      const { data } = await axios('/wishLists');
      console.log(data);
      setWishList(data);
    };
    getWishLists();
  }, []);

  const removeItemFromWishList = async id => {
    const { data } = await axios.patch(`/wishLists/${id}`);
    console.log('updated', data);
    setWishList(data);
  };

  return (
    <>
      <Navbar />
      {wishList.length === 0 ? (
        <Empty message="Wishlist is empty" />
      ) : (
        <div className="w-[70vw] mx-auto">
          <p className="text-2xl my-5 mx-3 text-gray-800 font-semibold">
            Your wishlist products
          </p>
          {wishList.map(item => (
            <div className="relative w-full">
              <ProductForCategory key={item._id} product={item} />
              <span
                onClick={() => removeItemFromWishList(item._id)}
                className="absolute right-2 top-2 cursor-pointer"
              >
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WishList;
