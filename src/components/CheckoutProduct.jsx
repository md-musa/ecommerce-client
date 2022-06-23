import React from 'react';

function CheckoutProduct(props) {
  const { images, price, title } = props.item.product;
  return (
    <div className="grid grid-cols-[1fr_2fr] items-center py-2 rounded-md">
      <div className="flex items-center justify-center">
        <img
          className="md:h-20 md:w-20 h-24 w-24 object-contain"
          src={images[0]}
          alt=""
        />
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <span className="font-bold text-lg md:text-xl">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CheckoutProduct;
