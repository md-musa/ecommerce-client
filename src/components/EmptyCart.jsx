import React from 'react';

function EmptyCart() {
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          className="-mt-4"
          src="https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png"
        />
      </div>
      <h1 className="-mt-16 text-gray-800 text-2xl md:text-3xl font-bold text-center">
        {' '}
        Your cart is empty...
      </h1>
    </>
  );
}

export default EmptyCart;
