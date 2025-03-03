import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { demoProducts } from '../../components/CustomComponents/utils';
import BuyNowStages from './BuyNowStages';
import { useAuth } from '../../context/MainContext';
import {
  addProductToOrdersById,
  deleteCartById,
  getProductInCartById,
} from '../../services/shop/shopservice';
import {
  getUserDetailsById,
  updateUserDetailsById,
} from '../../services/user/userservice';
import axios from 'axios';
import {
  payemntOrderUrl,
  paymentVerificationUrl,
} from '../../utils/ConnectionManager';

const BuyNow = () => {
  const { productsId } = useParams();
  const { user } = useAuth();
  const [productsList, setProductsList] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const handleSetProducts = useCallback(async () => {
    try {
      const splitParts = productsId?.toString()?.split('+');
      let updatedProductList = [];
      for (let index = 0; index < splitParts?.length; index++) {
        const element = splitParts[index];
        if (element.includes('p_')) {
          const productElement = demoProducts?.find((r) => r.id == element);
          const response = await getProductInCartById(user, element);
          if (response && response?.data) {
            if (response?.data?.success) {
              const cartElement = response?.data?.data[0];
              updatedProductList.push({
                productElement: productElement,
                cartElement: cartElement,
              });
            }
          }
        }
      }
      setProductsList(updatedProductList);
    } catch (error) {
      console.log('err', error);
    }
  }, [productsId, user]);

  const handleAddProductInOrders = async (orderId) => {
    try {
      let status = true;
      const buyProductsList = [...productsList];
      for (let index = 0; index < buyProductsList.length; index++) {
        const element = buyProductsList[index];
        if (element) {
          const orderObj = {
            productId: element?.cartElement?.product_id,
            userId: element?.cartElement?.user_id,
            quantity: element?.cartElement?.quantity,
            category: element?.cartElement?.category,
            size: element?.cartElement?.size,
            thickness: element?.cartElement?.thickness,
            price: element?.cartElement?.price,
            categoryPrice: element?.cartElement?.category_price,
            thicknessPrice: element?.cartElement?.thickness_price,
            sizePrice: element?.cartElement?.size_price,
            orderId: orderId,
            assignedTo: 1,
          };
          const response = await addProductToOrdersById(orderObj);
          if (response?.data?.success == false) {
            status = false;
            break;
          } else {
            const resp = await deleteCartById(
              user,
              element?.cartElement?.product_id
            );
            if (resp?.data?.success == false) {
              status = false;
              break;
            }
          }
        }
      }
      if (status) {
        setCurrentStep(4);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFetchUserDetails = useCallback(async () => {
    try {
      const response = await getUserDetailsById(user);
      if (response && response?.data) {
        if (response?.data?.success) {
          const userDetails = response?.data?.data[0];
          if (userDetails) {
            setUserInfo(userDetails);
          }
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  }, [user]);

  useEffect(() => {
    if (currentStep == 2) {
      handleFetchUserDetails();
    }
  }, [currentStep, handleFetchUserDetails]);

  useEffect(() => {
    handleSetProducts();
  }, [productsId, handleSetProducts]);

  const getTotalPrice = () => {
    if (productsList?.length > 0) {
      let totalPrice = 0;

      for (let index = 0; index < productsList.length; index++) {
        const element = productsList[index];

        if (element) {
          const sizePrice = element?.cartElement?.size_price || 0;
          const thicknessPrice = element?.cartElement?.thickness_price || 0;
          const categoryPrice = element?.cartElement?.category_price || 0;
          const quantity = element?.cartElement?.quantity || 1;

          totalPrice += (sizePrice + thicknessPrice + categoryPrice) * quantity;
        }
      }

      return totalPrice.toFixed(2); // Convert to 2 decimal places at the end
    }

    return '0.00'; // Ensure the return value is a string in 2 decimal places
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    const orderUrl = payemntOrderUrl; // Your Express server's order creation endpoint
    const paymentDetails = {
      amount: getTotalPrice(), // Amount in INR
      currency: 'INR',
    };

    try {
      const order = await axios.post(orderUrl, paymentDetails);
      const options = {
        key: 'rzp_test_JLPzhhSYQQkl9m', // Enter the Key ID generated from Razorpay Dashboard
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'Ur Mattress',
        description: 'Payment for Ur',
        order_id: order.data.id, // Razorpay Order ID
        handler: async function (response) {
          // Payment is completed; now verify the payment with your backend
          const verificationUrl = paymentVerificationUrl;
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            // Send the payment details to the backend for verification
            const verificationResponse = await axios.post(
              verificationUrl,
              paymentData
            );
            // Check the backend's response to verify whether payment was successful or not
            if (verificationResponse.data.success) {
              // Payment verification was successful
              handleFormSubmit(e, verificationResponse.data.orderId);
              // alert('Payment successful!');
              // Perform any additional actions such as updating UI or redirecting
            } else {
              alert('Payment verification failed. Please try again.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification error. Please try again.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
    }
  };

  const handleFormSubmit = async (e, order_Id) => {
    e.preventDefault();
    try {
      const orderId = order_Id;
      const userObject = {
        userId: user,
        userName: userInfo.user_name,
        userMobile: userInfo.user_mobile,
        alternateMobile: userInfo.alternate_mobile,
        houseNumber: userInfo.house_number,
        area: userInfo.area_name,
        district: userInfo.district_name,
        state: userInfo.state_name,
        pincode: userInfo.pincode,
        // orderId: orderId,
      };
      const resp = await updateUserDetailsById(userObject);
      if (resp && resp?.data?.success) {
        setCurrentStep(3);
        handleAddProductInOrders(orderId);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="h-14 bg-white w-full md:w-10/12 lg:w-9/12 mx-auto ">
        <div className="flex justify-center items-center">
          <p className="text-2xl font-mono font-semibold mt-2">Checkout</p>
        </div>
        <div className="w-full h-[2px] bg-blue-500 mt-4 "></div>
      </div>
      <div className="bg-white mt-4 w-full md:w-10/12 lg:w-9/12 mx-auto shadow-lg  min-h-screen">
        <div className="p-4">
          <BuyNowStages
            complete={complete}
            setComplete={setComplete}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          {currentStep == 1 && (
            <div>
              <div className="flex items-center justify-end mr-5">
                <div className="mr-4">
                  <span className="text-lg font-semibold text-gray-600">
                    Total Price:
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'monospace' }}
                  >
                    ₹{getTotalPrice()}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="bg-blue-500 text-white p-2 font-semibold rounded-md hover:scale-105"
                >
                  Proceed
                </button>
              </div>
              <div className="w-full p-3 bg-gray-100 rounded-lg mt-2">
                {productsList?.map((product) => (
                  <div key={product?.id} className="mt-3 w-full">
                    <div className="flex flex-col md:flex-row justify-between bg-white h-auto shadow-lg rounded-lg">
                      {/* Product Image */}
                      <div className="w-full md:w-1/3 p-3">
                        <img
                          className="h-48 w-full object-cover rounded-lg"
                          src={product?.productElement?.productImages[0]}
                          alt={product?.productElement?.name}
                        />
                      </div>
                      {/* Product Details */}
                      <div className="w-full md:w-2/3 p-3">
                        <p className="text-lg font-semibold font-mono underline">
                          {product?.productElement?.name}
                        </p>
                        <div className="p-2 space-y-2">
                          {/* Size Section */}
                          <div className="flex justify-between ">
                            <div className="flex">
                              <p className="text-gray-700 min-w-20">Size:</p>
                              <span className="text-gray-700 ml-1">
                                <strong>{product?.cartElement?.size}</strong>
                              </span>
                            </div>
                            <div className="flex">
                              <p className="text-gray-700">Price:</p>
                              <p className="text-gray-700 min-w-16 text-end">
                                <strong>
                                  ₹{product?.cartElement?.size_price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between ">
                            <div className="flex">
                              <p className="text-gray-700 min-w-20">
                                Thickness:
                              </p>
                              <span className="text-gray-700 ml-1">
                                <strong>
                                  {product?.cartElement?.thickness}
                                </strong>
                              </span>
                            </div>
                            <div className="flex">
                              <p className="text-gray-700">Price:</p>
                              <p className="text-gray-700 min-w-16 text-end">
                                <strong>
                                  ₹{product?.cartElement?.thickness_price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between ">
                            <div className="flex">
                              <p className="text-gray-700 min-w-20">
                                Category:
                              </p>
                              <span className="text-gray-700 ml-1">
                                <strong>
                                  {product?.cartElement?.category}
                                </strong>
                              </span>
                            </div>
                            <div className="flex">
                              <p className="text-gray-700">Price:</p>
                              <p className="text-gray-700 min-w-16 text-end">
                                <strong>
                                  ₹{product?.cartElement?.category_price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          {/* Quantity Section */}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Quantity:</span>
                            <span className="text-gray-700">
                              <strong>x{product?.cartElement?.quantity}</strong>
                            </span>
                          </div>
                          {/* Total Price Section */}
                          <div className="flex justify-end space-x-3 items-center border-t pt-2 mt-2">
                            <span className="text-xl font-bold text-gray-500">
                              Total Price:
                            </span>
                            <span className="text-xl font-bold">
                              ₹
                              {(
                                (product?.cartElement?.size_price +
                                  product?.cartElement?.thickness_price +
                                  product?.cartElement?.category_price) *
                                product?.cartElement?.quantity
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {/* <div className="mt-1 flex justify-center">
                          <span className="text-sm text-gray-500 font-semibold">
                            Category:
                          </span>
                          <span className="text-sm text-gray-500">
                            {product?.cartElement?.category}
                          </span>
                          <span className="text-sm ml-3 text-gray-500">
                            {product?.cartElement?.size}
                          </span>
                        </div> */}
                        {/* Extra Details */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentStep == 2 && (
            <div>
              <div className="mb-2 text-center w-full bg-blue-400 p-2 max-w-lg mx-auto">
                <p className="text-2xl font-semibold text-white">
                  Contact Details
                </p>
              </div>

              <div className="p-4 w-full max-w-lg mx-auto bg-white rounded-lg shadow-md">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    handlePayment(e);
                  }}
                >
                  {/* Contact Name */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.user_name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, user_name: e.target.value })
                      }
                      required
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contact name"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={userInfo?.user_mobile}
                      required
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          user_mobile: e.target.value,
                        })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter mobile number"
                    />
                  </div>

                  {/* Alternate Mobile Number */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Alternate Mobile Number
                    </label>
                    <input
                      type="tel"
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          alternate_mobile: e.target.value,
                        })
                      }
                      defaultValue={userInfo?.alternate_mobile}
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter alternate mobile number"
                    />
                  </div>

                  {/* House Number */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      House Number
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.house_number}
                      required
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          house_number: e.target.value,
                        })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter house number"
                    />
                  </div>

                  {/* Area Name */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Area Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.area_name}
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, area_name: e.target.value })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter area name"
                    />
                  </div>

                  {/* City/Town/District */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      City/Town/District
                    </label>
                    <input
                      type="text"
                      defaultValue={userInfo?.district_name}
                      required
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          district_name: e.target.value,
                        })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city/town/district"
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">State</label>
                    <input
                      type="text"
                      defaultValue={userInfo?.state_name}
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, state_name: e.target.value })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter state"
                    />
                  </div>

                  {/* PIN */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">PIN</label>
                    <input
                      type="number"
                      defaultValue={userInfo?.pincode}
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, pincode: e.target.value })
                      }
                      className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter PIN"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {currentStep == 3 && (
            <div>
              <div className="w-full min-h-screen flex justify-center items-center">
                <p className="text-2xl text-red-500">Payment Failed</p>
              </div>
            </div>
          )}
          {currentStep == 4 && (
            <div className="h-80">
              <div className="w-full h-full flex flex-col mt-4 justify-center items-center">
                {/* <div className="flex flex-col items-center justify-center min-h-screen"> */}
                {/* Animated Tick Icon */}
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Success Message */}
                <h1 className="text-3xl font-semibold mt-4 text-green-600">
                  Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mt-2">
                  Thank you for your purchase, Go to
                  <a
                    href="/Orders"
                    className="text-blue-900 font-semibold underline"
                  >
                    My Orders
                  </a>
                  for more details.
                </p>
                {/* </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
