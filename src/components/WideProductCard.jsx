import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { addItemToCart } from '../services/cart';
import { Rating } from '@mui/material';

function WideProductCard(props) {
  const queryClient = useQueryClient();

  const {
    title,
    images,
    price,
    _id,
    stock,
    rating,
    brand,
    reviews,
    discountPercentage,
  } = props.product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartMutation = useMutation(addItemToCart, {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  const remainingPriceAfterDiscount =
    price - (price * discountPercentage) / 100;

  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr] my-2">
        <Link to={`/products/${_id}`}>
          <div className="relative flex items-center p-1 justify-center">
            <img alt="" className="h-full w-full rounded-md" src={images[0]} />

            {/* Out of stock indicator */}
            {stock === 0 && (
              <img
                className="absolute w-4/5 top-1/3"
                src="http://cdn.storehippo.com/s/54225a9c5b9935640a0aac76/ms.files/OUT-OF-STOCK.png"
                alt="fd"
              />
            )}
          </div>
        </Link>

        <div className="px-3">
          <Link to={`/products/${_id}`}>
            <p className="my-2 hover:underline capitalize font-semibold text-xl text-gray-800">
              {title}
            </p>
          </Link>

          <p className="text-green-500 bg-green-100 font-medium rounded-sm w-min uppercase px-1">
            {brand}
          </p>

          {/* Rating  */}
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
            <p className="text-gray-500">{` (${reviews.length})`}</p>
          </div>

          {/* Discount indicator */}
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

          {/* Increment and decrement quantity */}
          <div className="flex items-center justify-between my-2">
            {stock > 0 && (
              <div className="flex items-center justify-between shadow-md rounded-lg border">
                <button
                  className="font-semibold p-1 hover:bg-gray-100"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <RemoveIcon />
                </button>
                <span className="px-2 text-2xl">{quantity}</span>
                <button
                  className="font-semibold p-1 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <AddIcon />
                </button>
              </div>
            )}

            {/* Add to cart button */}
            <div className="flex">
              {stock > 0 && (
                <button
                  onClick={() => addToCartMutation.mutate({ _id, price })}
                  className="rounded-md text-sm md:text-md border hover:shadow:md bg-gray-100 shadow-md text-gray-600 hover:bg-gray-200 px-3 py-1"
                  style={
                    addToCartMutation.isLoading ? { cursor: 'not-allowed' } : {}
                  }
                  disabled={addToCartMutation.isLoading ? true : false}
                >
                  <AddShoppingCartIcon className="" />
                  <span className="font-semibold ml-1">Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default WideProductCard;
