import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItemFromCart, updateQuantity } from '../services/cart';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { IconButton } from '@mui/material';

function CartProduct({ product }) {
  const queryClient = useQueryClient();
  const { quantity, _id } = product;
  const { title, images, price, brand } = product.product;

  const deleteMutation = useMutation(removeItemFromCart, {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  const updateQuantityMutation = useMutation(updateQuantity, {
    onSuccess: () => queryClient.invalidateQueries('cart'),
  });

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] my-2">
        <div className="flex items-center justify-center">
          <img alt="" className="" height={120} src={images[0]} width={120} />
        </div>
        <div className="px-3">
          <p className="my-2 capitalize font-semibold text-md md:text-xl text-gray-800">
            {title}
          </p>
          <p className="text-green-500 bg-green-100 text-sm rounded-sm w-min uppercase px-1">
            {brand}
          </p>
          <div className="items-center my-2 hidden sm:flex">
            <span className="text-gray-600 mx-2 flex items-center">
              {/* <span className="font-semibold mr-2">{rating.toFixed(2)}</span> */}
              {/* {<Rating rating={rating} />} */}
            </span>
          </div>
          <p className="mr-3 font-semibold text-gray-600 text-md md:text-xl min-w-min">
            ${(price * quantity).toFixed(2)}
          </p>
          {/* <span className="text-green-500 ml-2">In Stock</span> */}

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center justify-between shadow-lg rounded-lg border-2 border-gray-100">
              <IconButton
                onClick={() =>
                  updateQuantityMutation.mutate({
                    _id,
                    operation: 'DECREMENT',
                  })
                }
              >
                <RemoveIcon />
              </IconButton>
              <span className="px-2 text-xl">{quantity}</span>
              <IconButton
                onClick={() =>
                  updateQuantityMutation.mutate({
                    _id,
                    operation: 'INCREMENT',
                  })
                }
              >
                <AddIcon />
              </IconButton>
            </div>
            <div className="flex">
              <IconButton onClick={() => deleteMutation.mutate(_id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartProduct;
