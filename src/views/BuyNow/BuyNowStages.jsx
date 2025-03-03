import React from 'react';
import './stepper.css';
import {
  FaUser,
  FaShippingFast,
  FaCreditCard,
  FaClipboardCheck,
} from 'react-icons/fa';

const BuyNowStages = ({
  currentStep,
  setCurrentStep,
  complete,
  setComplete,
}) => {
  // Step labels and corresponding icons
  const steps = [
    { label: 'Shipping Info', icon: <FaShippingFast size={24} /> },
    { label: 'Customer Info', icon: <FaUser size={24} /> },
    { label: 'Payment Details', icon: <FaCreditCard size={24} /> },
    { label: 'Order Placed', icon: <FaClipboardCheck size={24} /> },
  ];

  return (
    <>
      <div className="flex justify-between md:justify-center space-x-4">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item flex flex-col items-center ${
              currentStep === i + 1 ? 'active' : ''
            } ${i + 1 < currentStep || complete ? 'complete' : ''}`}
          >
            <div
              className={`step w-12 h-12 flex justify-center items-center rounded-full ${
                i + 1 < currentStep || complete
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {/* Display the same icon for completed steps, but change the icon color */}
              {step.icon}
            </div>
            {/* Label is kept visible and turns green when completed */}
            <p
              className={`mt-2 text-center ${
                i + 1 < currentStep || complete
                  ? 'text-gray-500'
                  : 'text-gray-500'
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {!complete && (
        <button
          className="btn mt-1"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {/* {currentStep === steps.length ? 'Finish' : 'Next'} */}
        </button>
      )}
    </>
  );
};

export default BuyNowStages;
