import React from 'react';
import { Link } from 'react-router-dom';

function SearchedProduct(props) {
  const { title, thumbnail, id } = props.product;
  return (
    <Link to={`/productDetails/${id}`}>
      <div
        onClick={() => props.setProductName('')}
        className="grid grid-cols-[1fr_3fr] space-x-2 text-lg px-2 py-2 text-gray-500 hover:bg-gray-200"
      >
        <div>
          <img className="w-full rounded-md" src={thumbnail} alt="" srcset="" />
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default SearchedProduct;
