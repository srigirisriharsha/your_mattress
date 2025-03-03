import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PriceComponent } from '../../components/PriceDetailer/Price';
import { useAuth } from '../../context/MainContext';
import { demoProducts } from '../../components/CustomComponents/utils';
import {
  addMultipleProductToCartById,
  addProductToCartById,
  checkProductInCartById,
  deleteAllProductsInWishlistById,
  deleteWishlistById,
  getWishListById,
} from '../../services/shop/shopservice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import wishlist_empty from '../../assets/Images/wishlist_empty.png';
const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [productsByUser, setProductsByUser] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const resp = await getWishListById(user);
      if (resp && resp?.data) {
        if (resp?.data?.success) {
          let cartData = resp?.data?.data || [];
          cartData = cartData.map((f) => {
            const obj = demoProducts?.find((e) => e?.id === f?.product_id);
            return {
              demoProductObj: obj ? { ...obj } : {},
              cartDataObj: { ...f },
            };
          });
          setProductsByUser(cartData);
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

  const goToProductView = (productId) => {
    navigate(`/product/${productId}`);
  };
  const clearWishlist = async () => {
    const resp = await deleteAllProductsInWishlistById(user);
    if (resp && resp?.data) {
      if (resp?.data?.success) {
        toast.success(resp.data.message, {
          position: 'top-right', // Use the string format for position
          autoClose: 500,
        });
        fetchData();
      } else {
        toast.error(resp.data.message, {
          position: 'top-right',
          autoClose: 800,
        });
      }
    }
  };
  const clearProductFromWishlist = async (productId) => {
    const resp = await deleteWishlistById(user, productId);
    if (resp && resp?.data) {
      if (resp?.data?.success) {
        toast.success(resp.data.message, {
          position: 'top-right', // Use the string format for position
          autoClose: 500,
        });
        fetchData();
      } else {
        toast.error(resp.data.message, {
          position: 'top-right',
          autoClose: 800,
        });
      }
    }
  };
  const addProductToCart = async (product) => {
    const response = await checkProductInCartById(
      user,
      product.demoProductObj.id
    );

    if (response && response?.data) {
      if (response.data.success) {
        // Product already exists in the cart, show error message
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 800,
        });
        alert('Product is already in cart');
      } else {
        // Product not found, proceed to add to cart
        const resp = await addProductToCartById(
          product.demoProductObj.id,
          user,
          1,
          'Single',
          '72x30 (Single)',
          '5',
          product.demoProductObj.discountPrice
        );

        if (resp && resp?.data) {
          if (resp.data.success) {
            toast.success(resp.data.message, {
              position: 'top-right',
              autoClose: 500,
            });
            fetchData(); // Fetch the updated cart data
            clearProductFromWishlist(product.demoProductObj.id); // Remove from wishlist
          } else {
            toast.error(resp.data.message, {
              position: 'top-right',
              autoClose: 800,
            });
          }
        }
      }
    } else {
      // In case the response is not valid, you can log an error
      console.error('Failed to check product in the cart.');
    }
  };

  const addWishlistToCart = async () => {
    const array = await Promise.all(
      productsByUser.map(async (e) => {
        const response = await checkProductInCartById(
          user,
          e.demoProductObj.id
        );
        if (response && response.data?.success) {
          toast.error(
            `Product ${e.demoProductObj.name} is already in the cart`,
            {
              position: 'top-right',
              autoClose: 800,
            }
          );
          return null;
        } else {
          return {
            productId: e.demoProductObj.id,
            userId: user,
            quantity: 1,
            category: 'Single',
            size: '72x30 (Single)',
            thickness: '5',
            price: e.demoProductObj.discountPrice,
            categoryPrice: 0,
            sizePrice: 0,
            thicknessPrice: 0,
          };
        }
      })
    );
    const filteredArray = array.filter((item) => item !== null);
    if (filteredArray.length > 0) {
      const resp = await addMultipleProductToCartById(filteredArray);

      if (resp && resp.data) {
        if (resp.data.success) {
          toast.success(resp.data.message, {
            position: 'top-right',
            autoClose: 500,
          });
          clearWishlist();
        } else {
          toast.error(resp.data.message, {
            position: 'top-right',
            autoClose: 800,
          });
        }
      }
    } else {
      toast.info('All products are already in the cart', {
        position: 'top-right',
        autoClose: 800,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen animate-slideUp">
      <div className=" w-full md:w-10/12 lg:w-9/12 mx-auto ">
        <div className="flex flex-col p-4">
          <div className="bg-white p-2 rounded-lg ">
            <div className="flex justify-between">
              <h1
                className="text-3xl md:text-3xl"
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
              >
                Wishlist
              </h1>
              <div className="flex justify-between">
                <button
                  className="mr-2 flex justify-left bg-red p-2 group hover:bg-red-400 hover:text-white hover:rounded-lg focus:bg-red-600 focus:text-white focus:rounded-lg"
                  onClick={clearWishlist}
                >
                  <FaTrash className="text-gray-600 h-6 w-6 group-hover:text-white group-focus:text-white mr-3" />
                  Clear
                </button>
                <button
                  className="flex justify-left bg-red p-2 group hover:bg-violet-400 hover:text-white hover:rounded-lg focus:bg-violet-600 focus:text-white focus:rounded-lg"
                  onClick={addWishlistToCart}
                >
                  <FaCheck className="text-gray-600 h-6 w-6 group-hover:text-white group-focus:text-white mr-3" />
                  Move to Cart
                </button>
              </div>
            </div>
            <div className="w-full h-[2px] bg-blue-500 mt-2 "></div>
          </div>

          {productsByUser?.length > 0 ? (
            <>
              <div className="w-full flex flex-col mt-4 space-y-4 sm:space-y-0">
                <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
                  {productsByUser?.map((product, i) => (
                    <div
                      key={i}
                      className="bg-white border p-4 rounded-lg shadow-lg"
                    >
                      <div className="w-50 h-40 mb-2 rounded-lg overflow-hidden">
                        <img
                          onClick={() =>
                            goToProductView(product.demoProductObj.id)
                          }
                          src={product.demoProductObj.image}
                          alt={product.demoProductObj.name}
                          className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="w-full">
                        <p className="font-semibold cursor-pointer hover:underline">
                          {product.demoProductObj.name}
                        </p>
                        <PriceComponent
                          actualPrice={product.demoProductObj.actualPrice}
                          discountPrice={product.demoProductObj?.discountPrice}
                        />
                        <div className="flex justify-start space-x-4">
                          <button
                            onClick={() => {
                              addProductToCart(product);
                            }}
                            className="bg-violet-600 text-white text-center rounded-lg p-2 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => {
                              clearProductFromWishlist(
                                product.demoProductObj.id
                              );
                            }}
                            className="flex items-center justify-center space-x-2 bg-red-600 text-white text-center rounded-lg p-2 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
                          >
                            <FaTrash className="text-white h-5 w-5 group-hover:text-[#432f84]" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <a href="/Shop">
                <img
                  src={wishlist_empty}
                  alt="wishlist empty"
                  style={{
                    marginTop: '15px',
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

export default Wishlist;
