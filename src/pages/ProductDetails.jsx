import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Rating } from '@mui/material';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import ProductCard from '../components/ProductCard';
import { addItem } from '../stores/cartSlice';
import Navbar from '../components/Navbar';
import { useQuery } from 'react-query';
import {
  getProductByCategory,
  getProductDetails,
  getRelatedProducts,
} from '../services/product';
import indicateLoadingProgress from '../utils/loadingProgress';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import {
  addItemToWishlist,
  isExistItemInsideWishlist,
} from '../services/wishlist';
import { addItemToCart } from '../services/cart';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data: item } = useQuery(['productDetails', id], () =>
    getProductDetails(id)
  );

  indicateLoadingProgress(isLoading);

  const { data: relatedProducts } = useQuery(
    ['productByCategory', item?.category],
    () => getRelatedProducts(item?.category),
    {
      enabled: !!item?.category,
    }
  );

  const { data: wishlist } = useQuery(['wishlist', id], () =>
    isExistItemInsideWishlist(id)
  );

  const wishlistMutation = useMutation(addItemToWishlist);

  const addToCartMutation = useMutation(addItemToCart, {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  const remainingPriceAfterDiscount =
    item?.price - (item?.price * item?.discountPercentage) / 100;
  console.log('rem', remainingPriceAfterDiscount);
  return (
    <>
      <Navbar />
      {item && (
        <div className="pt-4 px-3 md:px-10 grid md:grid-cols-2">
          {/* Product images */}
          <div className="relative place-content-center">
            <img
              className="object-contain p-2 md:p-5 rounded-md "
              src={item?.images[0]}
              alt=""
            />
            {/*  Stock out indicator */}
            {item?.stock === 0 && (
              <img
                className="absolute w-3/5 top-1/4"
                src="http://cdn.storehippo.com/s/54225a9c5b9935640a0aac76/ms.files/OUT-OF-STOCK.png"
                alt="out of stock"
              />
            )}
          </div>

          <div className="">
            <h3 className="text-gray-600 capitalize text-4xl my-3">
              {item?.title}
            </h3>
            <p className="text-green-500 bg-green-100 font-semibold rounded-sm w-min uppercase px-1">
              {item?.brand}
            </p>

            {/* Product rating */}
            <div className="flex items-center my-2">
              {item?.rating > parseInt(item?.rating) ? (
                <Rating
                  name="half-rating-read"
                  defaultValue={item?.rating}
                  precision={0.5}
                  readOnly
                />
              ) : (
                <Rating
                  name="half-rating-read"
                  defaultValue={item?.rating}
                  readOnly
                />
              )}
              <p className="text-gray-500">{` (${item?.reviews.length})`}</p>
            </div>

            {/* Product's price and discount indicator */}
            <p className="font-semibold text-xl text-gray-700">
              ${remainingPriceAfterDiscount.toFixed(2)}
            </p>
            {item?.discountPercentage > 0 && (
              <p>
                <span className="line-through text-sm text-gray-500">
                  ${`${item?.price.toFixed(2)}   `}
                </span>
                <span className="text-sm text-gray-500">
                  . {item?.discountPercentage}% off
                </span>
              </p>
            )}

            <small className="text-gray-500">without shipping & handling</small>
            <br />
            <p className="my-4 text-xl text-gray-600">{item?.description}</p>
            <span
              onClick={() => wishlistMutation.mutate({ id })}
              className="cursor-pointer"
            >
              <IconButton>
                {wishlist ? (
                  <FavoriteIcon style={{ color: '#f46463' }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: '#f46463' }} />
                )}
              </IconButton>
            </span>
            <div className="flex justify-between">
              {item?.stock > 0 && (
                <>
                  <button
                    onClick={() => {
                      addToCartMutation.mutate({
                        _id: item._id,
                        price: item.price,
                      });
                      navigate('/cart');
                    }}
                    className="p-2 rounded-sm w-2/5 hover:bg-gray-200 shadow-md my-2 bg-gray-100 text-gray-700 text-xl"
                    type="button"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() =>
                      addToCartMutation.mutate({
                        _id: item._id,
                        price: item.price,
                      })
                    }
                    className="p-2 rounded-sm w-2/5 hover:bg-yellow-600 shadow-md my-2 bg-yellow-500 text-xl"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <h3 className="my-3 mx-6 font-semibold text-3xl text-gray-600">
        Related products
      </h3>
      {relatedProducts && (
        <div className="grid rounded-sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {relatedProducts.map(item => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
