import CheckoutProduct from '../components/CheckoutProduct';
import Navbar from '../components/Navbar';
import ProgressingStep from '../components/ProgressingStep';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function CheckOut() {
  const items = useSelector(state => state.cart.products);
  const subTotalPrice = items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);
  return (
    <>
      <Navbar />
      <ProgressingStep />

      <div className="grid md:grid-cols-2">
        <div className="px-10">
          <h1 className="font-bold text-2xl">Summary Order</h1>
          <p className="text-gray-600 mb-8">
            Check your item and select your shipping for better experiences
            order item.
          </p>

          <div className="bg-gray-100 rounded-md md:pr-4">
            {items.map(item => (
              <CheckoutProduct item={item} key={item._id} />
            ))}
          </div>
          <div className="flex justify-between px-4 mt-4 bg-gray-100 py-1 rounded-md">
            <h1 className="font-bold text-xl md:text-2xl text-gray-600">
              Total
            </h1>
            <span className="font-bold  text-xl md:text-2xl text-gray-600">
              ${subTotalPrice.toFixed(2)}
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

            <button className="btn-primary text-white font-bold" type="text">
              Save and Deliver Here
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
