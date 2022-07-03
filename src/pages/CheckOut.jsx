import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutProduct from '../components/CheckoutProduct';
import Navbar from '../components/Navbar';
import ProgressingStep from '../components/ProgressingStep';
import { getCartItems } from '../services/cart';
import indicateLoadingProgress from '../utils/loadingProgress';

function CheckOut() {
  const { isLoading, data: cart } = useQuery('cart', getCartItems);
  indicateLoadingProgress(isLoading);

  return (
    <>
      <Navbar />
      <div className="grid md:grid-cols-2">
        <div className="px-10">
          <h1 className="font-bold text-2xl">Summary Order</h1>
          <p className="text-gray-600 mb-8">
            Check your item and select your shipping for better experiences
            order item.
          </p>

          <p className="font-bold pb-3">{cart?.products.length} ITEMS</p>

          <div className="bg-gray-100 rounded-md md:pr-4">
            {cart?.products?.map(item => (
              <CheckoutProduct item={item} key={item._id} />
            ))}
          </div>
          <div className="flex justify-between px-4 mt-4 bg-gray-100 py-1 rounded-md">
            <h1 className="font-semibold text-xl md:text-2xl text-gray-600">
              Total
            </h1>
            <span className="font-semibold  text-xl md:text-2xl text-gray-600">
              ${cart?.total}
            </span>
          </div>
        </div>

        <div className="px-8 mt-4">
          <h1 className="font-bold text-2xl">Details</h1>
          <p className="text-gray-600 my-2">
            Complete your order by providing your shipping details.
          </p>
          <form className="">
            <input
              className="com-input"
              type="text"
              placeholder="Full Name"
              required
            />
            <br />
            <input
              className="com-input"
              type="email"
              placeholder="Email Address"
              required
            />
            <br />
            <input
              className="com-input"
              type="tel"
              placeholder="Phone Number"
              required
            />
            <br />
            <input
              className="com-input"
              type="text"
              placeholder="Shipping Address"
              required
            />
            <br />
            <input
              className="com-input"
              type="number"
              placeholder="Postal Code"
              required
            />
            <br />

            <button onClick={handlePayment} className="btn-primary" type="text">
              Proceed to Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
