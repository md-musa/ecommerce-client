import { Box, Button } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Empty({ message, route }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          className="-mt-4"
          src="https://cdni.iconscout.com/illustration/premium/thumb/your-cart-is-empty-2161427-1815069.png"
        />
      </div>
      <h1 className="-mt-16 mb-6 text-gray-800 text-2xl md:text-3xl font-bold text-center">
        {message}
      </h1>
      <Box textAlign="center">
        <Button
          className="border"
          variant="outlined"
          onClick={() => navigate(route || '/')}
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
}

export default Empty;
