import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartProduct from '../components/CartProduct';
import shippingImg from '../assets/images/shipping.jpg';
import Navbar from '../components/Navbar';
import Empty from '../components/Empty';
import authSlice from '../stores/authSlice';
import { getCartItems } from '../services/cart';
import indicateLoadingProgress from '../utils/loadingProgress';
import { useQuery } from 'react-query';

function ShoppingCart() {
  const { isLoading, data: cart } = useQuery('cart', getCartItems);
  console.log('CART==> ', cart);

  // indicateLoadingProgress(isLoading);

  const updateQuantity = async (productId, operation) => {
    try {
      const { data } = await axios.patch('/carts/updateQuantity', {
        operation,
        productId,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {cart?.products?.length === 0 ? (
        <Empty message="Your cart is empty" />
      ) : (
        <div className="grid md:grid-cols-[3fr_1fr]">
          <div className="p-4">
            <div className="overflow-hidden rounded-t-md">
              <img className="" src={shippingImg} alt="" srcSet="" />
            </div>
            <div className="p-4 mt-1 rounded-b-md shadow-xl">
              <h1 className="p-2 mb-1 text-xl font-bold md:text-2xl"> Cart</h1>

              <hr />

              {cart?.products?.map(item => (
                <CartProduct
                  product={item}
                  updateQuantity={updateQuantity}
                  // removeItemFromCart={deleteMutation}
                  key={item._id}
                />
              ))}
              <div className="flex justify-between mt-2 text-gray-600">
                <p className="p-1 text-xl"> Subtotal</p>
                <p className="p-1 text-xl">${cart.subTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="sticky top-0 px-8 pb-2 mt-4 bg-white h-max rounded-md shadow-lg border-2 border-gray-100 md:py-2 md:px-4">
            <h1 className="p-2 mb-1 text-2xl font-bold"> Checkout</h1>
            <input
              className="com-input bg-white border-2 border-gray-100"
              type="text"
              placeholder="Promo code"
            />
            <button className="btn-primary mt-3" type="button">
              Apply
            </button>
            <hr className="hrDash" />

            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-xl"> Subtotal</p>
              <p className="p-1 text-xl">${cart.subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-md"> Discount</p>
              <p className="p-1 text-md">${0}</p>
            </div>
            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-md"> Delivery</p>

              <p className="p-1 text-md">${cart.deliveryCharge}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p className="p-1 text-md"> Tax</p>
              <p className="p-1 text-md">${cart.tax.toFixed(2)}</p>
            </div>

            <hr className="hrDash" />

            <div className="flex justify-between text-gray-600 subtotal">
              <p className="p-1 text-xl font-bold"> Total</p>
              <p className="p-1 text-xl font-bold">${cart.total.toFixed(2)}</p>
            </div>

            <Link to="checkout">
              <button className="btn-primary" type="button">
                Proceed
              </button>
            </Link>
            <Link to="/">
              <button
                className="btn-secondary
            "
                type="button"
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
