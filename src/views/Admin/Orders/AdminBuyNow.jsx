import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/MainContext';
import {
  demoProducts,
  generateRandomId,
  indianStatesAndUTs,
} from '../../../components/CustomComponents/utils';
import emptyCart from '../../../assets/Images/emptyCart.png';
import indianFlag from '../../../assets/Images/indianFlag.png';
import {
  checkValidUserWithEmail,
  updateUserDetailsById,
} from '../../../services/user/userservice';
import { registerUser } from '../../../services/login/loginServices';
import AdminBuyNowStages from './AdminBuyNowStages';
import { addProductToOrdersById } from '../../../services/shop/shopservice';

const AdminBuyNow = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: '',
    mobileNumber: '',
    email: '',
  };
  const [userData, setUserData] = useState(defaultValues);
  const { productsId } = useParams();
  const { adminCart } = useAuth();
  const [productsList, setProductsList] = useState([]);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  const handleSetProducts = useCallback(async () => {
    try {
      if (adminCart?.length > 0) {
        const splitParts = productsId?.toString()?.split('+');
        let updatedProductList = [];
        for (let index = 0; index < splitParts?.length; index++) {
          const element = splitParts[index];
          if (element.includes('p_')) {
            const productElement = demoProducts?.find((r) => r.id == element);
            const productElement1 = adminCart?.find((r) => r.id == element);
            updatedProductList.push({
              productElement: productElement,
              cartElement: {
                ...productElement1,
                size_price: productElement1?.sizePrice,
                category_price: productElement1?.categoryPrice,
                thickness_price: productElement1?.thicknessPrice,
              },
            });
          }
        }
        setProductsList(updatedProductList);
      } else {
        setProductsList([]);
      }
    } catch (error) {
      console.log('err', error);
    }
  }, [productsId, adminCart]);

  useEffect(() => {
    handleSetProducts();
  }, [productsId, handleSetProducts]);
  useEffect(() => {
    if (currentStep === 5) {
      const timer = setTimeout(() => {
        navigate('/admin/customers-orders');
      }, 3000); // 3 seconds

      // Cleanup the timer when component unmounts or currentStep changes
      return () => clearTimeout(timer);
    }
  }, [currentStep, navigate]);
  const getTotalPrice = useCallback(() => {
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
  }, [productsList]);

  const { totalDiscount, totalAmount } = useMemo(() => {
    let totalPrice = 0;
    let totalDiscount = totalDiscountPrice || 0;
    let totalAmount = 0;

    const actualPrice = getTotalPrice() || 0;
    totalPrice += actualPrice;
    // Ensure totalDiscount does not exceed totalPrice
    if (totalDiscount > totalPrice) {
      totalDiscount = totalPrice;
    }

    // Calculate total amount based on the total discount
    totalAmount = totalPrice - totalDiscount;

    return { totalDiscount, totalAmount };
  }, [totalDiscountPrice, getTotalPrice]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      return updatedUserData;
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userData.name) {
      setError('Please fill in the email field.');
      return;
    }
    const resp = await checkValidUserWithEmail(userData.email);

    if (resp && resp?.data) {
      if (resp?.data?.success && resp?.data?.data?.isValid?.length > 0) {
        setCurrentStep((prev) => prev + 1);
        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            ...resp.data.data.isValid[0],
          };

          return updatedUserData;
        });
      } else {
        const userObject = {
          name: userData.name,
          email: userData.email,
          password: 'urpro@123#',
          address: '',
          mobile: userData.mobileNumber,
        };
        const resp = await registerUser(userObject);
        if (resp && resp?.data) {
          if (resp?.data?.success) {
            setCurrentStep((prev) => prev + 1);
          }
        }
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resps = await checkValidUserWithEmail(userData.email);

      if (resps && resps?.data) {
        if (resps?.data?.success && resps?.data?.data?.isValid?.length > 0) {
          const getUserObj = { ...resps.data.data.isValid[0] };
          const userObject = {
            userId: getUserObj?.user_id,
            userName: userData.name,
            userMobile: userData.mobileNumber,
            alternateMobile: userData.alternate_mobile,
            houseNumber: userData.house_number,
            area: userData.area_name,
            district: userData.district_name,
            state: userData.state_name,
            pincode: userData.pincode,
            // orderId: orderId,
          };
          const resp = await updateUserDetailsById(userObject);
          if (resp && resp?.data?.success) {
            setUserData((prevUserData) => {
              const updatedUserData = {
                ...prevUserData,
                ...userObject,
              };

              return updatedUserData;
            });
            setCurrentStep((prev) => prev + 1);
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleAddProductInOrders = async () => {
    try {
      const orderId = generateRandomId('order', '_');
      let status = true;
      const buyProductsList = [...productsList];
      for (let index = 0; index < buyProductsList.length; index++) {
        const element = buyProductsList[index];
        if (element) {
          const orderObj = {
            productId:
              element?.cartElement?.id || element?.cartElement?.product_id,
            userId: userData?.userId,
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
            // } else {
            //   const resp = await deleteCartById(
            //     user,
            //     element?.cartElement?.product_id
            //   );
            //   if (resp?.data?.success == false) {
            //     status = false;
            //     break;
            //   }
          }
        }
      }
      if (status) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleSelectChange = (e) => {
    setUserData({
      ...userData,
      state: e.target.value,
    });
  };
  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-2 ">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Checkout
          </h1>
        </div>
        <div className="w-full h-[2px] bg-blue-500 mt-2 "></div>
      </div>
      <div className=" ">
        <div className="">
          {productsList?.length > 0 ? (
            <>
              <div className="bg-white w-full  shadow-lg mt-4 p-4  rounded-lg">
                <AdminBuyNowStages
                  complete={complete}
                  setComplete={setComplete}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
              {currentStep == 1 && (
                <div>
                  <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">
                    {/* Product List Section */}
                    <div className="grid grid-cols-1 gap-4 w-full lg:w-3/4">
                      {productsList?.map((product, i) => (
                        <div key={i} className="w-full">
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
                                    <p className="text-gray-700 min-w-20">
                                      Size:
                                    </p>
                                    <span className="text-gray-700 ml-1">
                                      <strong>
                                        {product?.cartElement?.size}
                                      </strong>
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
                                  <span className="text-gray-700">
                                    Quantity:
                                  </span>
                                  <span className="text-gray-700">
                                    <strong>
                                      x{product?.cartElement?.quantity}
                                    </strong>
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
                              {/* Extra Details */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Cart Total Price Details Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-1/4 h-auto">
                      <div className="font-semibold text-center lg:text-left">
                        Total Price Details
                      </div>
                      <div className="w-full h-[1px] bg-gray-200 my-2"></div>
                      <div className="flex justify-between font-semibold">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Total Items:
                        </label>
                        <span>{productsList?.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="website-admin"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Total Price:
                        </label>
                        <span className="text-right">₹{getTotalPrice()}</span>
                      </div>

                      <label
                        htmlFor="website-admin"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Total Discount:
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                          ₹
                        </span>
                        <input
                          type="text"
                          id="website-admin"
                          className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                          placeholder="Enter Total Discount"
                          value={totalDiscountPrice}
                          onChange={(e) => {
                            let discount = parseFloat(e.target.value) || 0;
                            const totalPrice = getTotalPrice();

                            // Restrict the discount to not exceed the total price
                            if (discount > totalPrice) {
                              discount = totalPrice;
                            }

                            setTotalDiscountPrice(discount);
                          }}
                        />
                      </div>

                      <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                      <div className="flex justify-between font-semibold">
                        <label
                          htmlFor="website-admin"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Total Amount to pay:
                        </label>
                        <span className="text-right">₹{totalAmount}</span>
                      </div>

                      <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                      <center className="text-red-600">
                        Discount ₹{totalDiscount} on this purchase
                      </center>
                      <button
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        className="w-full bg-blue-500 text-white p-2 font-semibold rounded-md hover:scale-105  mt-4"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {currentStep == 2 && (
                <>
                  <div className="bg-white shadow-lg rounded-lg">
                    <form
                      onSubmit={handleRegister}
                      className=" w-full max-w-md mx-auto p-4 mt-4"
                    >
                      <div className="">
                        {/* Name Input */}
                        <div className="mb-4">
                          <label
                            className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Customer Name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                          />
                        </div>

                        {/* Mobile Number Input */}
                        <div className="mb-4">
                          <label
                            className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                            htmlFor="phone-input"
                          >
                            Mobile Number
                          </label>
                          <div className="flex items-center">
                            <button
                              id="dropdown-phone-button"
                              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                              type="button"
                            >
                              <img
                                src={indianFlag} // Indian flag image URL
                                alt="India Flag"
                                className="h-4 w-4 me-2"
                              />
                              +91
                            </button>
                            <input
                              type="text"
                              id="phone-input"
                              name="mobileNumber"
                              className="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              pattern="[6-9][0-9]{9}"
                              placeholder="9876543210"
                              maxLength={10}
                              value={userData.mobileNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                          <label
                            className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                          />
                        </div>

                        {/* Error Message */}
                        {error && (
                          <div className="col-span-2">
                            <p className="text-red-500 mt-2 mb-4">{error}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="col-span-2">
                          <button
                            type="submit"
                            // disabled={!userData.checkbox}
                            className={`mt-4 w-full py-2 font-semibold rounded-md focus:outline-none focus:ring-2 bg-black text-white hover:bg-blue-700 focus:ring-purple-500`}
                          >
                            Continue
                          </button>
                          <button
                            type="submit"
                            onClick={() => setCurrentStep((prev) => prev - 1)}
                            className={` bg-white text-black border border-black hover:bg-blue-700 hover:text-white focus:ring-purple-500 mt-4 w-full py-2 font-semibold rounded-md focus:outline-none focus:ring-2`}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {currentStep == 3 && (
                <div>
                  <div className="p-4 w-full  bg-white rounded-lg shadow-md mt-4">
                    <form
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      onSubmit={handleFormSubmit}
                    >
                      {/* Contact Name */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={userData?.name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              name: e.target.value,
                            })
                          }
                          required
                          className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter contact name"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium  mb-1">
                          Mobile Number
                        </label>
                        <div className="flex items-center">
                          <button
                            id="dropdown-phone-button"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                            type="button"
                          >
                            <img
                              src={indianFlag} // Indian flag image URL
                              alt="India Flag"
                              className="h-4 w-4 me-2"
                            />
                            +91
                          </button>
                          <input
                            type="text"
                            id="phone-input"
                            name="mobileNumber"
                            className="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            pattern="[6-9][0-9]{9}"
                            placeholder="9876543210"
                            maxLength={10}
                            value={userData.mobileNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">
                          Alternate Mobile
                        </label>
                        <div className="flex items-center">
                          <button
                            id="dropdown-phone-button"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                            type="button"
                          >
                            <img
                              src={indianFlag} // Indian flag image URL
                              alt="India Flag"
                              className="h-4 w-4 me-2"
                            />
                            +91
                          </button>
                          <input
                            type="text"
                            id="phone-input"
                            name="alternate_mobile"
                            className="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            pattern="[6-9][0-9]{9}"
                            placeholder="9876543210"
                            maxLength={10}
                            value={userData.alternate_mobile}
                            onChange={handleChange}
                            // required
                          />
                        </div>
                      </div>
                      {/* House Number */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">
                          House Number
                        </label>
                        <input
                          type="text"
                          value={userData?.house_number}
                          // required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
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
                          value={userData?.area_name}
                          // required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              area_name: e.target.value,
                            })
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
                          value={userData?.district_name}
                          // required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              district_name: e.target.value,
                            })
                          }
                          className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter city/town/district"
                        />
                      </div>

                      {/* State */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">
                          State
                        </label>
                        {/* <input
                          type="text"
                          value={userData?.state_name}
                          // required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              state_name: e.target.value,
                            })
                          }
                          className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter State"
                        /> */}
                        <select
                          className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="state"
                          value={userData.state}
                          onChange={handleSelectChange}
                          required={
                            userData.houseNumber !== '' ||
                            userData.district !== '' ||
                            userData.area !== '' ||
                            userData.pincode !== ''
                          }
                        >
                          <option value="">Select your State</option>
                          {indianStatesAndUTs?.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* PIN */}
                      <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">
                          Pin Code
                        </label>
                        <input
                          type="number"
                          value={userData?.pincode}
                          maxLength={6}
                          onChange={(e) => {
                            const input = e.target.value;
                            if (input.length <= 6) {
                              setUserData({
                                ...userData,
                                pincode: input,
                              });
                            }
                          }}
                          className="p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your Pin Code"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex flex-col md:flex-row justify-center mt-6 md:col-span-2 gap-4">
                        <button
                          type="submit"
                          className=" w-full px-6 py-2 bg-black text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Continue
                        </button>
                        <button
                          type="submit"
                          onClick={() => setCurrentStep((prev) => prev - 1)}
                          className=" w-full bg-white text-black border border-black hover:bg-blue-700 hover:text-white focus:ring-purple-500 py-2 font-semibold rounded-md focus:outline-none focus:ring-2"
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {currentStep == 4 && (
                <>
                  <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between">
                    {/* Customer Details Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                      <div className="font-semibold text-center lg:text-left text-lg">
                        Customer Details
                      </div>
                      <div className="w-full h-[1px] bg-gray-200 my-4"></div>

                      {/* Customer Info */}
                      <div className="space-y-3">
                        {[
                          { label: 'Name', value: userData?.name },
                          {
                            label: 'Mobile',
                            value: userData?.mobileNumber,
                          },
                          { label: 'Email', value: userData?.email },
                          {
                            label: 'House',
                            value: userData?.house_number,
                          },
                          { label: 'Area', value: userData?.area_name },
                          {
                            label: 'City',
                            value: userData?.city_name,
                          },
                          { label: 'State', value: userData?.state_name },
                          { label: 'Pin Code', value: userData?.pincode },
                        ].map((item, index) =>
                          item.value ? ( // Conditionally render only if the value exists
                            <div key={index} className="flex justify-left">
                              <label className="text-sm font-medium text-gray-900 ">
                                {item.label}:
                              </label>
                              <> </>
                              <span className="ml-2 text-gray-700">
                                {item.value}
                              </span>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>

                    {/* Total Price Details Section */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-1/3">
                      <div className="font-semibold text-center lg:text-left text-lg">
                        Total Price Details
                      </div>
                      <div className="w-full h-[1px] bg-gray-200 my-4"></div>

                      {/* Price Info */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-gray-900">
                            Total Items:
                          </label>
                          <span className="text-gray-700">
                            {productsList?.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-gray-900">
                            Total Amount to Pay:
                          </label>
                          <span className="text-gray-700">₹{totalAmount}</span>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-gray-200 my-4"></div>

                      {/* Buttons */}
                      <div className="space-y-4">
                        <button
                          onClick={handleAddProductInOrders}
                          className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Place Order
                        </button>
                        <button
                          onClick={() => setCurrentStep((prev) => prev - 1)}
                          className="w-full py-3 bg-white text-black border border-black font-semibold rounded-md hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentStep == 5 && (
                <div className="h-80 bg-white shadow-lg rounded-lg">
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
                      Thank you for your purchase, Go to<> </>
                      <a
                        href="/admin/customers-orders"
                        className="text-blue-900 font-semibold underline"
                      >
                        Orders
                      </a>
                      <> </>for more details.
                    </p>
                    {/* </div> */}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/admin/add-order/">
                <img
                  src={emptyCart}
                  alt="emptyCart"
                  style={{
                    marginTop: '15px',
                    paddingTop: '30px',
                    objectFit: 'contain',
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    height: '70vh',
                    width: '100vw',
                  }}
                />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBuyNow;
