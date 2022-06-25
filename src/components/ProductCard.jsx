import React from 'react';
import Rating from '@mui/material/Rating';
import { useQueryClient, useMutation } from 'react-query';

import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../services/cart';

function ProductCard(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    _id,
    title,
    images,
    rating,
    brand,
    price,
    stock,
    discountPercentage,
  } = props.product;

  const remainingPriceAfterDiscount =
    price - (price * discountPercentage) / 100;

  const addToCartMutation = useMutation(addItemToCart, {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  return (
    <div className="relative flex flex-col justify-between border-[3px] border-gray-100 p-4 m-5 shadow-2xl rounded-md">
      <div>
        <div
          onClick={() => navigate(`/products/${_id}`)}
          className="relative flex cursor-pointer items-center justify-center"
        >
          <img
            alt=""
            className="h-full w-full object-contain rounded-md"
            loading="lazy"
            src={images[0]}
          />

          {/* Out of stock indicator */}
          {stock === 0 && (
            <img
              className="absolute w-4/5 top-1/3"
              src="http://cdn.storehippo.com/s/54225a9c5b9935640a0aac76/ms.files/OUT-OF-STOCK.png"
              alt="fd"
            />
          )}
        </div>
        <p
          onClick={() => navigate(`/products/${_id}`)}
          className="my-2 capitalize hover:underline cursor-pointer font-semibold text-xl"
        >
          {title}
        </p>
        <p className="text-green-500 bg-green-100 font-medium rounded-sm w-min uppercase px-1">
          {brand}
        </p>
        <div className="flex items-center my-2">
          {rating > parseInt(rating) ? (
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
          ) : (
            <Rating name="half-rating-read" defaultValue={rating} readOnly />
          )}
          <p className="text-gray-500">{'   (05)'}</p>
        </div>
        <p className="font-semibold text-xl text-gray-700">
          ${remainingPriceAfterDiscount.toFixed(2)}
        </p>
        {discountPercentage > 0 && (
          <p>
            <span className="line-through text-sm text-gray-500">
              ${`${price.toFixed(2)}   `}
            </span>
            <span className="text-sm text-gray-500">
              . {discountPercentage}% off
            </span>
          </p>
        )}
      </div>
      {stock > 0 && (
        <button
          onClick={() => addToCartMutation.mutate({ _id, price })}
          className="btn-primary h-10 mb-2 self-end"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
