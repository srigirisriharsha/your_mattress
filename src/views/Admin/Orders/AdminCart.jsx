import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import emptyCart from '../../../assets/Images/emptyCart.png';
import { demoProducts } from '../../../components/CustomComponents/utils';
import { useAuth } from '../../../context/MainContext';
const AdminCart = () => {
  const navigate = useNavigate();
  const { setAdminCart, adminCart } = useAuth();
  const [productsByUser, setProductsByUser] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      let cartData = adminCart || [];
      cartData = cartData.map((f) => {
        const obj = demoProducts?.find((e) => e?.id === f?.id);
        return {
          demoProductObj: obj ? { ...obj } : {},
          cartDataObj: { ...f },
        };
      });
      setProductsByUser(cartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [adminCart]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { totalPrice, totalDiscount, totalAmount } = useMemo(() => {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalAmount = 0;

    productsByUser?.forEach((product) => {
      const actualPrice = product.demoProductObj?.actualPrice || 0;
      const discountPrice = product?.cartDataObj?.price || 0;

      totalPrice += actualPrice;
      totalDiscount += actualPrice - discountPrice;
      totalAmount += discountPrice;
    });

    return { totalPrice, totalDiscount, totalAmount };
  }, [productsByUser]);

  const goToProductView = (productId) => {
    navigate(`/admin/product/${productId}`);
  };
  const handleCheckOut = (e) => {
    e.preventDefault();
    let param = '';
    for (let i = 0; i < productsByUser?.length; i++) {
      if (productsByUser[i]?.demoProductObj?.id?.includes('p_')) {
        param = param + productsByUser[i]?.demoProductObj?.id + '+';
      }
    }
    navigate(`/admin/buy-product-now/${param}`);
  };
  const clearCart = async () => {
    setAdminCart([]);
  };
  const clearProductFroCart = async (productId) => {
    const objNotInCart = adminCart?.filter((e) => e.id !== productId);
    setAdminCart(objNotInCart);
  };
  return (
    <div className="bg-gray-100 min-h-screen animate-slideUp">
      <div className=" w-full  ">
        <div className="flex flex-col p-4">
          <div className="bg-white rounded-lg shadow-md p-2 ">
            <div className="flex justify-between items-center">
              <h1
                className="text-3xl md:text-3xl"
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
              >
                Cart
              </h1>
              <div className="flex justify-between">
                <button
                  className="mr-2 flex justify-left bg-red p-2 group hover:bg-red-400 hover:text-white hover:rounded-lg focus:bg-red-600 focus:text-white focus:rounded-lg"
                  onClick={clearCart}
                >
                  <FaTrash className="text-gray-600 h-6 w-6 group-hover:text-white group-focus:text-white mr-3" />
                  Clear
                </button>
                <button
                  onClick={(e) => handleCheckOut(e)}
                  className="flex justify-left bg-red p-2 group hover:bg-violet-400 hover:text-white hover:rounded-lg focus:bg-violet-600 focus:text-white focus:rounded-lg"
                >
                  <FaCheck className="text-gray-600 h-6 w-6 group-hover:text-white group-focus:text-white mr-3" />
                  Check Out
                </button>
              </div>
            </div>
            <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-2"></div>
          </div>
          {productsByUser?.length > 0 ? (
            <>
              <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">
                {/* Product List Section */}
                <div className="grid grid-cols-1 gap-4 w-full lg:w-3/4">
                  {productsByUser?.map((product, i) => (
                    <div
                      key={i}
                      className="bg-white border p-4 rounded-lg shadow-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToProductView(product.demoProductObj?.id);
                      }}
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        {/* Product Image */}
                        <div className="w-full h-48 lg:w-32 lg:h-32 rounded-lg overflow-hidden">
                          <img
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents triggering the parent div's click event
                              goToProductView(product.demoProductObj?.id);
                            }}
                            src={product.demoProductObj?.image}
                            alt={product.demoProductObj?.name}
                            className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 hover:scale-110"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col lg:flex-row justify-between gap-4 w-full">
                          <div>
                            <p
                              className="font-semibold cursor-pointer hover:underline"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering the parent div's click event
                                goToProductView(product.demoProductObj?.id);
                              }}
                            >
                              {product.demoProductObj?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Size: {product.cartDataObj?.size}
                            </p>
                            <p className="text-sm text-gray-500">
                              Thickness: {product.cartDataObj?.thickness}
                            </p>
                            <span className="text-md">₹</span>
                            <span className="text-xl font-bold">
                              {product.cartDataObj?.price}
                            </span>
                          </div>
                          {/* Action Buttons */}
                          <div className="flex    lg:flex-col justify-between gap-2 lg:ml-8">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering the parent div's click event
                                clearProductFroCart(product.demoProductObj?.id);
                              }}
                              className="flex items-center justify-center space-x-2 bg-red-600 text-white rounded-lg p-2 w-32 transform transition duration-500 ease-in-out hover:scale-110"
                            >
                              <FaTrash className="text-white h-5 w-5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cart Total Price Details Section */}
                <div className="bg-white p-4 rounded-lg shadow-lg w-full lg:w-1/4 h-auto">
                  <div className="font-semibold text-center lg:text-left">
                    Cart Total Price Details
                  </div>
                  <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                  <div className="p-2 flex justify-between">
                    <span>Total Price:</span>
                    <span className="text-right">₹{totalPrice}</span>
                  </div>

                  <div className="p-2 flex justify-between">
                    <span>Total Discount:</span>
                    <span className="text-right">₹{totalDiscount}</span>
                  </div>

                  <div className="p-2 flex justify-between">
                    <span>Shipping & Delivery:</span>
                    <span className="text-right text-green-600">FREE</span>
                  </div>

                  <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                  <div className="p-2 flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-right">₹{totalAmount}</span>
                  </div>

                  <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                  <center className="text-green-600">
                    Savings ₹{totalDiscount} on this purchase
                  </center>
                </div>
              </div>
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

export default AdminCart;
