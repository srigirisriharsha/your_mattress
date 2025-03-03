import React from 'react';
import '../BuyNow/stepper.css'; // Ensure this CSS file has the necessary styles
import {
  FaClipboardCheck,
  FaIndustry,
  FaBoxOpen,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaBan,
  FaUndo,
} from 'react-icons/fa'; // Importing necessary icons

const ProgressTracker = ({ state }) => {
  // Step labels and corresponding icons
  const icons = {
    'Order Placed': <FaClipboardCheck size={24} />, // Smaller icon size
    Manufacturing: <FaIndustry size={24} />,
    'Ready to ship': <FaBoxOpen size={24} />,
    Shipping: <FaShippingFast size={24} />,
    'Out For Delivery': <FaTruck size={24} />,
    Delivered: <FaCheckCircle size={24} />,
    Canceled: <FaBan size={24} />,
    Returned: <FaUndo size={24} />,
  };

  // Assign dates to match each step's label
  const dateMap = {
    'Order Placed': state?.order_placed_date,
    Manufacturing: state?.manufacturing_date,
    'Ready to ship': state?.ready_to_ship_date,
    Shipping: state?.shipping_date,
    'Out For Delivery': state?.out_for_delivery_date,
    Delivered: state?.delivery_date,
    Canceled: state?.canceled_date,
    Returned: state?.returned_date,
  };

  const orderStatusArrayInOrder = [
    'Order Placed',
    'Manufacturing',
    'Ready to ship',
    'Shipping',
    'Out For Delivery',
    'Delivered',
  ];

  // Function to determine current step and completion status
  const getObj = () => {
    let currentStep = 0; // Start from 0 for better indexing
    let complete = false;
    let isCanceled = false;

    // Check if the order is canceled
    if (state?.order_status === 'Canceled') {
      isCanceled = true;
      const statusIndex = orderStatusArrayInOrder.indexOf(
        state?.customer_changes_status
      );
      currentStep = statusIndex !== -1 ? statusIndex + 1 : currentStep;
    } else {
      // Find the index of the current status in the array
      const statusIndex = orderStatusArrayInOrder.indexOf(state?.order_status);
      if (statusIndex !== -1) {
        currentStep = statusIndex + 1; // Add 1 to match your current logic
      }
      if (['Delivered'].includes(state?.order_status)) {
        complete = true;
      }
    }

    return { currentStep, complete, isCanceled };
  };

  const { currentStep, complete, isCanceled } = getObj();

  // If canceled, filter the steps up to the last valid status before cancellation
  const filteredStatuses = isCanceled
    ? [...orderStatusArrayInOrder.slice(0, currentStep), 'Canceled']
    : orderStatusArrayInOrder;

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
      {/* For mobile, allow horizontal scrolling */}
      <div className="flex justify-between sm:justify-between items-center space-x-4 overflow-x-auto sm:overflow-visible">
        {filteredStatuses?.map((label, i) => {
          const isActive = currentStep === i + 1;
          const isComplete = i + 1 < currentStep || complete;

          return (
            <div
              key={i}
              className={`step-item flex flex-col items-center relative w-full sm:w-auto text-center ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
              style={{ minWidth: '80px' }} // Add this to ensure enough space for each step on mobile
            >
              {/* Connecting line */}
              {i !== 0 && (
                <div
                  className={`absolute top-0 left-1/2 h-full sm:h-auto sm:w-full sm:top-1/2 sm:-left-full transform -translate-x-1/2 sm:translate-y-1/2 border-t sm:border-t-0 sm:border-l border-gray-300 ${
                    isComplete ? 'border-green-500' : ''
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`mt-2 step w-8 h-8 flex justify-center items-center rounded-full text-sm ${
                  isComplete
                    ? 'bg-green-500 text-white'
                    : label === 'Canceled'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-black'
                }`}
              >
                {icons[label] || <FaCheckCircle size={24} />}
              </div>

              {/* Step Label */}
              <p
                className={`mt-1 text-xs ${isComplete ? 'text-gray-500' : 'text-black'}`}
              >
                {label}
              </p>

              {/* Step Date */}
              <p
                className={`text-xs ${isComplete ? 'text-gray-500' : 'text-black'}`}
              >
                {dateMap[label] || <div className="m-2" />}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
