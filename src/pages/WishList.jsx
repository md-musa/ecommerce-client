import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

function WishList() {
  const [wishList, setWishList] = useState([]);
  console.log(wishList);
  useEffect(() => {
    axios(`/wishLists/${'62a37c2ad8377e3b3ca91117'}`)
      .then(res => setWishList(res.data.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3">
        {wishList.map(item => (
          <ProductCard product={item} />
        ))}
      </div>
    </>
  );
}

export default WishList;
