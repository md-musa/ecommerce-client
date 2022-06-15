import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../stores/cartSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

function CartProduct(props) {
  const { title, images, price, _id, rating, quantity } = props.product;
  const dispatch = useDispatch();

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] my-2">
        <div className="flex items-center justify-center">
          <img alt="" className="" height={120} src={images[0]} width={120} />
        </div>
        <div className="px-3">
          <p className="my-2 font-semibold text-md md:text-xl text-gray-800">
            {title}
          </p>
          <div className="items-center my-2 hidden sm:flex">
            <span className="text-gray-600 mx-2 flex items-center">
              {/* <span className="font-semibold mr-2">{rating.toFixed(2)}</span> */}
              {/* {<Rating rating={rating} />} */}
            </span>
          </div>
          <p className="mr-3 font-semibold text-gray-600 text-lg md:text-2xl min-w-min">
            ${(price * quantity).toFixed(2)}
          </p>
          {/* <span className="text-green-500 ml-2">In Stock</span> */}

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center justify-between shadow-md rounded-lg border">
              <button
                className="font-semibold p-1 hover:bg-gray-100"
                onClick={() => dispatch(decreaseQuantity(`${_id}`))}
              >
                <RemoveIcon />
              </button>
              <span className="px-2 text-2xl">{quantity}</span>
              <button
                className="font-semibold p-1 hover:bg-gray-100"
                onClick={() => dispatch(increaseQuantity(`${_id}`))}
              >
                <AddIcon />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => dispatch(removeItem({ _id }))}
                className="rounded-md bg-red-100 text-red-500 hover:bg-gray-100 px-2 py-1"
              >
                <DeleteIcon />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartProduct;
