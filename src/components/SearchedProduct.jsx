import React from 'react';
import { Link } from 'react-router-dom';

function SearchedProduct(props) {
  const { title, images, _id, price } = props.product;
  return (
    <Link to={`/products/${_id}`}>
      <div
        onClick={() => props.setProductName('')}
        className="grid grid-cols-[1fr_3fr] space-x-2 text-lg px-2 py-2 text-gray-500 hover:bg-gray-200"
      >
        <div className="">
          <img className="w-full rounded-md" src={images[0]} alt="" srcSet="" />
        </div>
        <div>
          {' '}
          <p className="capitalize text-lg">{title}</p>
          <p className="font-medium text-lg md:text-xl">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchedProduct;
