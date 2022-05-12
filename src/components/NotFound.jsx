import React from 'react';
import Navbar from './Navbar';

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div>
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/404-3025721-2526919.png"
            alt=""
          />
          <h3 className="text-3xl font-bold text-center text-gray-600">
            Not found the page 404
          </h3>
        </div>
      </div>
    </>
  );
}

export default NotFound;
