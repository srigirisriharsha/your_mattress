import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ProgressTracker from '../../orders/progressTracker';
import AdminOrderStateChangeModal from './AdminOrderStateChangeModal';
import { FaArrowLeft } from 'react-icons/fa';
import { orderStatusStyles } from '../../../components/CustomComponents/Constants';
import isEmpty from '../../../components/CustomComponents/utils';

const AdminOrderedProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stateObj, setStateObj] = useState(state);
  const [showModal, setShowModal] = useState(false);
  const goToProductView = (productId) => {
    navigate(`/admin/product/${productId}`);
  };
  const getState = () => {
    const statusMap = {
      'Order Placed': [
        'Order Placed',
        'Manufacturing',
        'Ready to ship',
        'Shipping',
        'Out For Delivery',
        'Delivered',
      ],
      Manufacturing: [
        'Manufacturing',
        'Ready to ship',
        'Shipping',
        'Out For Delivery',
        'Delivered',
      ],
      'Ready to ship': [
        'Ready to ship',
        'Shipping',
        'Out For Delivery',
        'Delivered',
      ],
      Shipping: ['Shipping', 'Out For Delivery', 'Delivered'],
      'Out For Delivery': ['Out For Delivery', 'Delivered'],
    };

    return statusMap[stateObj?.cartDataObj.order_status] || [];
  };

  const orderStatusArrayInOrder = getState();
  return (
    <div className="bg-gray-100  animate-slideUp">
      {showModal && (
        <AdminOrderStateChangeModal
          showModal={showModal}
          setShowModal={setShowModal}
          orderStatusArrayInOrder={orderStatusArrayInOrder}
          setStateObj={setStateObj}
          stateObj={stateObj}
        />
      )}
      <div className="w-full md:w-10/12 lg:w-9/12 mx-auto p-4">
        <div
          key={stateObj?.key}
          className="bg-white border p-4 rounded-lg shadow-md "
        >
          <p className="text-sm text-gray-500">
            Order Id : {stateObj?.cartDataObj.order_id}
          </p>
          <p className="text-sm text-gray-500">
            Order Placed By : {stateObj?.userObj?.user_name}
          </p>
          <br />
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Product Image */}
            <div className="w-full h-48 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
              <img
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's click event
                  goToProductView(stateObj?.demoProductObj.id);
                }}
                src={stateObj?.demoProductObj.image}
                alt={stateObj?.demoProductObj.name}
                className="w-full h-full cursor-pointer object-cover transform transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col lg:flex-row justify-between w-full">
              <div>
                <p
                  className="font-semibold cursor-pointer hover:underline mb-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the parent div's click event
                    goToProductView(stateObj?.demoProductObj.id);
                  }}
                >
                  {stateObj?.demoProductObj.name}
                </p>
                <div className="flex justify-between gap-10">
                  {/* Product Details */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Size: {stateObj?.cartDataObj?.size || '-'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Thickness: {stateObj?.cartDataObj?.thickness || '-'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {stateObj?.cartDataObj?.category || '-'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {stateObj?.cartDataObj?.quantity || '-'}
                    </p>
                  </div>

                  {/* Spacing Column (if required for layout) */}
                  <div>
                    <p className="text-sm text-gray-500">-</p>
                    <p className="text-sm text-gray-500">-</p>
                    <p className="text-sm text-gray-500">-</p>
                  </div>

                  {/* Pricing Details */}
                  <div>
                    <p className="text-sm text-gray-700">
                      Price: ₹ {stateObj?.cartDataObj?.size_price || '-'}
                    </p>
                    <p className="text-sm text-gray-700">
                      Price: ₹ {stateObj?.cartDataObj?.thickness_price || '-'}
                    </p>
                    <p className="text-sm text-gray-700">
                      Price: ₹ {stateObj?.cartDataObj?.category_price || '-'}
                    </p>
                    <p className="text-sm text-gray-700">
                      X {stateObj?.cartDataObj?.quantity || '-'}
                    </p>
                  </div>
                </div>

                {/* Total Price */}
                <p className="text-sm text-gray-700 border-t-2 m-2 justify-end flex">
                  Total: <b>₹ {stateObj?.cartDataObj?.price || '-'}</b>
                </p>
              </div>

              {/* Delivery Date */}
              <div className=" flex justify-between mt-4 lg:mt-0 lg:ml-8 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                {stateObj?.cartDataObj.order_status === 'Delivered' ? (
                  <>
                    <div className="w-24 text-center">
                      <p className="text-sm font-semibold border border-green-500 text-green-500 bg-white p-1 rounded-lg">
                        {stateObj?.cartDataObj.order_status}
                      </p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="mt-4 lg:mt-0 text-sm text-gray-500">
                        Delivered on:
                      </p>
                      <p className="text-sm font-semibold">
                        {stateObj?.cartDataObj.delivered_date}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-24 text-center">
                      <p
                        className={`text-sm font-semibold border border-orange-500 text-orange-500 bg-white p-1 rounded-lg ${
                          orderStatusStyles[
                            isEmpty(
                              stateObj?.cartDataObj.customer_changes_status
                            )
                              ? stateObj?.cartDataObj.customer_changes_status
                              : stateObj?.cartDataObj?.order_status
                          ] || ''
                        }`}
                      >
                        {isEmpty(
                          stateObj?.cartDataObj.customer_changes_status
                        ) ? (
                          <>{stateObj?.cartDataObj.customer_changes_status}</>
                        ) : (
                          <>{stateObj?.cartDataObj.order_status}</>
                        )}
                      </p>
                    </div>
                    <div className="w-24 text-center">
                      {/* Check if the order is neither canceled nor returned, and customer status is empty */}
                      {stateObj?.cartDataObj.order_status !== 'Canceled' &&
                      stateObj?.cartDataObj.order_status !== 'Returned' &&
                      !stateObj?.cartDataObj.customer_changes_status ? (
                        <>
                          <div className="text-center lg:text-left">
                            <p className="text-sm text-gray-500">
                              Delivery on:
                            </p>
                            <p className="text-sm font-semibold">
                              {stateObj?.cartDataObj.delivery_date}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className=""></div>
                        </>
                      )}
                    </div>
                    <div className="w-24 text-center">
                      {/* Check if the order is neither canceled nor returned, and customer status is empty */}
                      {stateObj?.cartDataObj.order_status !== 'Canceled' &&
                      stateObj?.cartDataObj.order_status !== 'Returned' &&
                      !stateObj?.cartDataObj.customer_changes_status ? (
                        <>
                          <button
                            onClick={() => {
                              setShowModal(true); // Trigger modal to handle action
                            }}
                            className="w-24 text-sm font-semibold border bg-red-500 hover:bg-red-600 p-1 rounded-lg text-white"
                          >
                            {status} {/* Display current status */}
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-sm text-gray-600 whitespace-nowrap text-left">
                            <div>
                              {stateObj?.cartDataObj.customer_changes_status}
                              <> </>
                              on:
                            </div>
                            <div>
                              <b>
                                {
                                  stateObj?.cartDataObj
                                    .customer_changes_status_date
                                }
                              </b>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <button
                onClick={() => navigate('/admin/customers-orders/')}
                className="border border-black gap-2  text-black p-2 rounded-lg w-full  h-10   flex items-center justify-center"
              >
                <FaArrowLeft />
                Back
              </button>
            </div>
            <button
              className="bg-black p-2 text-white rounded-lg shadow-lg"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Change Status
            </button>
          </div>
        </div>
        <div>
          <ProgressTracker state={stateObj?.cartDataObj} />
        </div>

        <div className="p-4 mt-4 bg-white rounded-lg shadow-lg mx-auto">
          <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
          <p className="text-sm text-gray-500">
            {stateObj?.userObj?.house_number} , {stateObj?.userObj?.area_name}
          </p>
          <p className="text-sm text-gray-500">
            {stateObj?.userObj?.district_name}
          </p>
          <p className="text-sm text-gray-500">
            {stateObj?.userObj?.state_name}
          </p>
          <p className="text-sm text-gray-500">
            Pin Code : {stateObj?.userObj?.pincode}
          </p>
          <p className="text-sm text-gray-700">
            Mobile Number: {stateObj?.userObj?.user_mobile}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderedProduct;
