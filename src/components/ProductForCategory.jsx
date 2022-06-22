import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../stores/cartSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

function ProductForCategory(props) {
  const { title, images, price, _id, rating } = props.product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr] my-2">
        <Link to={`/products/${_id}`}>
          <div className="flex items-center p-1 justify-center">
            <img alt="" className="h-full w-full rounded-md" src={images[0]} />
          </div>
        </Link>
        <div className="px-3">
          <Link to={`/products/${_id}`}>
            <p className="my-2 hover:underline font-semibold text-xl text-gray-800">
              {title}
            </p>
          </Link>
          <div className="items-center my-2 flex">
            <span className="text-gray-600 mx-2 flex items-center">
              {/* <span className="font-semibold mr-2">{rating}</span> */}
              {/* {<Rating rating={rating} />} */}
              <span className="text-[#e4ae06] mx-2 font-semibold"></span>
            </span>
          </div>
          <p className="mr-3 font-semibold text-gray-700 text-xl md:text-2xl min-w-min">
            ${price.toFixed(2)}
          </p>
          {/* <span className="text-green-500 ml-2">In Stock</span> */}

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center justify-between shadow-md rounded-lg border">
              <button
                className="font-semibold p-1 hover:bg-gray-100"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <RemoveIcon />
              </button>
              <span className="px-2 text-2xl">{quantity}</span>
              <button
                className="font-semibold p-1 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() =>
                  dispatch(addItem({ ...props.product, quantity }))
                }
                className="rounded-md text-sm md:text-md border hover:shadow:md bg-gray-100 shadow-md text-gray-600 hover:bg-gray-200 px-3 py-1"
              >
                <AddShoppingCartIcon className="" />
                <span className="font-semibold ml-1">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default ProductForCategory;
