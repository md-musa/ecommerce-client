import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
// import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem } from '../store/cartSlice';
import Rating from './Rating';

function ProductCard(props) {
  const navigate = useNavigate();
  const { id, title, thumbnail, rating, price, discountPercentage } =
    props.product;
  const dispatch = useDispatch();

  function addToCart(product) {
    dispatch(addItem(product));
  }

  return (
    <div className="flex flex-col justify-between p-4 m-5 bg-gray-100 shadow-md rounded-md">
      <div>
        <div
          onClick={() => navigate(`/productDetails/${id}`)}
          className="flex cursor-pointer items-center justify-center"
        >
          <img
            alt=""
            className="h-full w-full object-contain rounded-md"
            loading="lazy"
            src={thumbnail}
          />
        </div>
        <p
          onClick={() => navigate(`/productDetails/${id}`)}
          className="my-2 hover:underline cursor-pointer font-semibold text-xl"
        >
          {title}
        </p>
        <div className="flex items-center my-2">
          <Rating rating={rating} />
        </div>
        <p className="font-semibold text-xl text-gray-700">
          ${price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => addToCart(props.product)}
        className="btn-primary h-10 mb-2 self-end"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
