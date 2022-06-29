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
      <div className="grid grid-cols-[1fr_3fr] my-2 h-min">
        <div className="flex items-center justify-center">
          <img alt="" className="rounded-md" src={images[0]} />
        </div>
        <div className="px-3">
          <p className="my-2 capitalize font-medium text-md md:text-xl text-gray-800">
            {title}
          </p>
          <p className="text-green-500 bg-green-100 text-sm rounded-sm w-min uppercase px-1">
            {brand}
          </p>

          <p className="mr-3 text-gray-600 text-md md:text-xl min-w-min">
            Price:{' '}
            <span className="font-medium text-gray-600 text-md md:text-lg min-w-min">
              {' '}
              ${(price * quantity).toFixed(2)}
            </span>
          </p>

          <div className="flex items-center justify-between my-2">
            <div className="flex items-center justify-between shadow-lg rounded-lg border-2 border-gray-100">
              <span style={quantity === 1 ? { cursor: 'not-allowed' } : {}}>
                <IconButton
                  disabled={quantity === 1 ? true : false}
                  onClick={() =>
                    updateQuantityMutation.mutate({
                      _id,
                      operation: 'DECREMENT',
                    })
                  }
                >
                  <RemoveIcon />
                </IconButton>
              </span>
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
              <span
                style={
                  deleteMutation.isLoading ? { cursor: 'not-allowed' } : {}
                }
              >
                <IconButton
                  disabled={deleteMutation.isLoading ? true : false}
                  onClick={() => deleteMutation.mutate(_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartProduct;
