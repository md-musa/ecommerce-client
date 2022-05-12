import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import shippingImg from '../assets/images/shipping.jpg';
import Navbar from '../components/Navbar';
import EmptyCart from '../components/EmptyCart';

function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.products);

  const subTotalPrice = cartItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <>
      <Navbar />

      {cartItems.length == 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-[3fr_1fr]">
          <div className="p-4">
            <div className="overflow-hidden rounded-t-md">
              <img className="" src={shippingImg} alt="" srcSet="" />
            </div>
            <div className="p-4 mt-1 rounded-b-md shadow-xl">
              <h1 className="p-2 mb-1 text-xl font-bold md:text-2xl"> Cart</h1>

              <hr />

              {cartItems.map(item => (
                <CartProduct product={item} key={item.id} />
              ))}
              <div className="flex justify-between mt-2 text-gray-600">
                <p className="p-1 text-xl"> Subtotal</p>
                <p className="p-1 text-xl">${subTotalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="sticky top-0 px-8 pb-2 mt-4 h-max rounded-md shadow-lg md:py-2 md:px-4">
            <h1 className="p-2 mb-1 text-2xl font-bold"> Checkout</h1>
            <input
              className="com-input shadow-sm"
              type="text"
              placeholder="Promo code"
            />
            <button
              className="btn-primary
            "
            >
              Apply
            </button>
            <hr className="hrDash" />

            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-xl"> Subtotal</p>
              <p className="p-1 text-xl">${subTotalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-md"> Discount</p>
              <p className="p-1 text-md">${0}</p>
            </div>
            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-md"> Delivery</p>

              <p className="p-1 text-md">${0}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p className="p-1 text-md"> Tax</p>
              <p className="p-1 text-md">${0}</p>
            </div>

            <hr className="hrDash" />

            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-xl font-bold"> Total</p>
              <p className="p-1 text-xl font-bold">
                ${subTotalPrice.toFixed(2)}
              </p>
            </div>

            <Link to="checkout">
              <button
                className="btn-primary
            "
              >
                Proceed
              </button>
            </Link>
            <Link to="/">
              <button
                className="btn-secondary
            "
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
