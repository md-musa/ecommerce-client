import React from 'react';
import Navbar from '../components/Navbar';

function PaymentSuccess() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <img
          className="h-[300px]"
          src="https://cdn3d.iconscout.com/3d/premium/thumb/man-making-successful-payment-2937678-2426378.png"
          alt=""
          srcset=""
        />
      </div>
      <p className="text-2xl font-semibold text-green-500 bg-green-100 p-1 text-center">
        <span> Payment has been Successful</span>
      </p>
    </>
  );
}

export default PaymentSuccess;
