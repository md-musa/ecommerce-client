import React from 'react';
import Navbar from '../components/Navbar';

function PaymentCanceled() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <img
          className="h-[300px]"
          src="https://cdn3d.iconscout.com/3d/premium/thumb/cancel-button-5351693-4475600.png"
          alt=""
          srcset=""
        />
      </div>
      <p className="text-2xl font-semibold text-red-500 bg-red-100 p-1 text-center">
        <span> Payment has been cancelled</span>
      </p>
    </>
  );
}

export default PaymentCanceled;
