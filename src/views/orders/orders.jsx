import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';
import isEmpty, { demoProducts } from '../../components/CustomComponents/utils';
import { getProductInOrderById } from '../../services/shop/shopservice';
import emptyCart from '../../assets/Images/emptyCart.png';
import 'react-toastify/dist/ReactToastify.css';
import {
  orderStatusArray,
  orderStatusStyles,
} from '../../components/CustomComponents/Constants';
import { getUserDetailsById } from '../../services/user/userservice';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [productsByUser, setProductsByUser] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getProductInOrderById(user);
      if (response && response.data) {
        if (response.data.success) {
          let cartData = response.data.data || [];

          // Use Promise.all to wait for all promises in the map
          const cartDataPromises = cartData.map(async (f) => {
            const obj = demoProducts?.find((e) => e?.id === f?.product_id);
            const resp = await getUserDetailsById(f?.user_id);
            return {
              demoProductObj: obj ? { ...obj } : {},
              cartDataObj: { ...f },
              userObj: { ...resp?.data?.data[0] },
            };
          });

          // Wait for all promises to resolve
          const resolvedCartData = await Promise.all(cartDataPromises);
          setProductsByUser(resolvedCartData);
        } else {
          setProductsByUser([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  const goToProductView = (product) => {
    navigate(`/order-product/${product?.demoProductObj.id}`, {
      state: product,
    });
  };
  const goToProductViewToCart = (productId) => {
    navigate(`/product/${productId}`);
  };
  const handleStatusChange = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const filteredProducts = selectedStatuses.length
    ? productsByUser.filter((product) =>
        selectedStatuses.includes(product?.cartDataObj.order_status)
      )
    : productsByUser;

  return (
    <div className="bg-gray-100 min-h-screen animate-slideUp ">
      <div className="w-full md:w-10/12 lg:w-9/12 mx-auto p-4">
        <div className="bg-white p-2 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl md:text-3xl"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              Orders
            </h1>
          </div>
          <div className="w-full h-[2px] bg-blue-500 mt-2"></div>
        </div>

        {productsByUser?.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">
            {/* Filters Section */}
            <div className="bg-white p-2 rounded-lg shadow-md w-full lg:w-1/4">
              <h3 className="font-semibold mb-2">Filters</h3>
              <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

              <div className="text-sm font-medium text-gray-700 mb-2">
                Status
              </div>
              {orderStatusArray.map((status, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    id={`status-checkbox-${index}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    name="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                  <label
                    htmlFor={`status-checkbox-${index}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>

            {/* Products Section */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full lg:w-3/4">
              {filteredProducts.map((product) => (
                <div
                  key={product?.key}
                  className="bg-white border p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToProductView(product);
                  }}
                >
                  <p className="text-sm text-gray-500 mb-2">
                    Order Id : {product?.cartDataObj?.order_id}
                  </p>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    {/* Product Image */}
                    <div className="w-full h-48 sm:h-32 lg:w-28 lg:h-28 rounded-lg overflow-hidden">
                      <img
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the parent div's click event
                          goToProductViewToCart(product?.demoProductObj.id);
                        }}
                        src={product?.demoProductObj.image}
                        alt={product?.demoProductObj.name}
                        className="w-full h-full cursor-pointer object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col lg:flex-row justify-between w-full">
                      <div>
                        <p
                          className="font-semibold cursor-pointer hover:underline"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents triggering the parent div's click event
                            goToProductViewToCart(product?.demoProductObj.id);
                          }}
                        >
                          {product?.demoProductObj.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {product?.cartDataObj?.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Thickness: {product?.cartDataObj?.thickness}
                        </p>
                        <p className="text-lg text-black">
                          <b>₹ {product?.cartDataObj?.price}</b>
                        </p>
                      </div>

                      {/* Delivery Date */}
                      <div className=" flex justify-between mt-4 lg:mt-0 lg:ml-8 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                        {product?.cartDataObj.order_status === 'Delivered' ? (
                          <>
                            <div className="w-24 text-center">
                              <p className="text-sm font-semibold border border-green-500 text-green-500 bg-white p-1 rounded-lg">
                                {product?.cartDataObj.order_status}
                              </p>
                            </div>
                            <div className="text-center lg:text-left">
                              <p className="mt-4 lg:mt-0 text-sm text-gray-500">
                                Delivered on:
                              </p>
                              <p className="text-sm font-semibold">
                                {product?.cartDataObj.delivered_date}
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
                                      product?.cartDataObj
                                        .customer_changes_status
                                    )
                                      ? product?.cartDataObj
                                          .customer_changes_status
                                      : product?.cartDataObj?.order_status
                                  ] || ''
                                }`}
                              >
                                {isEmpty(
                                  product?.cartDataObj.customer_changes_status
                                ) ? (
                                  <>
                                    {
                                      product?.cartDataObj
                                        .customer_changes_status
                                    }
                                  </>
                                ) : (
                                  <>{product?.cartDataObj.order_status}</>
                                )}
                              </p>
                            </div>
                            <div className="w-24 text-center">
                              {/* Check if the order is neither canceled nor returned, and customer status is empty */}
                              {product?.cartDataObj.order_status !==
                                'Canceled' &&
                              product?.cartDataObj.order_status !==
                                'Returned' &&
                              !product?.cartDataObj.customer_changes_status ? (
                                <>
                                  <div className="text-center lg:text-left">
                                    <p className="text-sm text-gray-500">
                                      Delivery on:
                                    </p>
                                    <p className="text-sm font-semibold">
                                      {product?.cartDataObj.delivery_date}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-sm text-gray-600 whitespace-nowrap text-left">
                                    <div>
                                      {
                                        product?.cartDataObj
                                          .customer_changes_status
                                      }
                                      <> </>
                                      on:
                                    </div>
                                    <div>
                                      <b>
                                        {
                                          product?.cartDataObj
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <a href="/Shop">
              <img
                src={emptyCart}
                alt="emptyCart"
                className="object-contain rounded-lg bg-white mx-auto w-full h-[70vh]"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
