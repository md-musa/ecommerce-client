import {
  CheckCircleIcon,
  CreditCardIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';

function ProgressingStep() {
  const [tracker, setTacker] = useState({
    inInformation: true,
    inPayment: false,
    inComplete: false,
  });
  return (
    <div className="flex my-3 justify-center items-center">
      <InformationCircleIcon className="ring-2 ring-blue-500  h-10 w-10 bg-blue-200 p-2 rounded-full text-blue-700" />
      <span className="text-blue-500 font-bold">- - - - - - - -</span>
      <CreditCardIcon className=" h-10 w-10 bg-red-200 p-2 rounded-full text-red-700" />
      <span
        className={
          tracker.inPayment
            ? 'text-blue-500 font-bold ring-2 ring-red-500 '
            : 'text-gray-400'
        }
      >
        - - - - - - - -
      </span>
      <CheckCircleIcon className=" h-10 w-10  bg-green-200 p-2 rounded-full text-green-700" />
    </div>
  );
}

export default ProgressingStep;
