import React from 'react';

function CheckoutProduct(props) {
  const { images, price, title } = props.item.product;
  return (
    <div className="grid grid-cols-[1fr_2fr] h-32 rounded-md">
      <div className="flex items-center justify-center h-full p-2">
        <img
          className="object-contain h-full rounded-md"
          src={images[0]}
          alt=""
        />
      </div>
      <div className="p-5">
        <p className="text-gray-800 capitalize text-lg">{title}</p>
        <p className="text-md">
          Price: <span className="font-semibold">${price.toFixed(2)}</span>
        </p>
        <p className="text-md md:text-md">Quantity: {props.item.quantity}</p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
