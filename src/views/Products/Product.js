import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import { demoProducts } from '../../components/CustomComponents/utils';
import ProductImageSlider from '../../components/Slider/Slider';
import { Rating } from '../../components/Rating/Rating';
import ProductKeyFeatures from './ProductKeyFeatures';
import ProductCustomerReviews from './ProductCustomerReviews';
import ProductSpecifications from './ProductSpecifications';
import ProductFaq from './ProductFaq';
import { useAuth } from '../../context/MainContext';
import {
  addProductToCartById,
  addProductToUserWishList,
  checkProductInCartById,
  deleteWishlistById,
  fetchUserWishLists,
} from '../../services/shop/shopservice';
const VerticalCarousel = () => {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [currCategory, setCurrentCategory] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [currThickness, setCurrentThickness] = useState({
    thickness: '5',
    price: 0,
  });

  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hasWishLists, setHasWishLists] = useState(false);
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const handleFetchCartList = useCallback(async () => {
    if (isAuthenticated) {
      const userId = user;
      const response = await checkProductInCartById(userId, id);
      if (response && response?.data) {
        if (response?.data?.success) {
          setIsProductAddedToCart(true);
        }
      }
    }
  }, [user, isAuthenticated, id]);
  const handleFetchWishList = useCallback(async () => {
    if (isAuthenticated) {
      const userId = user;
      const response = await fetchUserWishLists(userId);

      if (response && response?.data?.data?.length > 0) {
        const list = response?.data?.data.find((e) => e.product_id === id);
        if (list) {
          setHasWishLists(true);
        }
      }
    }
  }, [user, isAuthenticated, id]);
  useEffect(() => {
    handleFetchWishList();
    handleFetchCartList();
  }, [id, handleFetchWishList, handleFetchCartList]);

  const thicknessOptions = useMemo(
    () => [
      { thickness: '5', price: 0 },
      { thickness: '6', price: 2500 },
      { thickness: '8', price: 4500 },
      { thickness: '10', price: 6500 },
    ],
    []
  );
  const categories = useMemo(
    () => [
      { name: 'Single', price: productDetails?.discountPrice },
      { name: 'Double', price: productDetails?.discountPrice + 2500 },
      { name: 'Queen', price: productDetails?.discountPrice + 4500 },
      { name: 'King', price: productDetails?.discountPrice + 6500 },
    ],
    [productDetails]
  );

  // Sizes per category
  const allSizes = useMemo(
    () => ({
      Single: [
        { size: '72x30 (Single)', price: 0 },
        { size: '72x36 (Single)', price: 1900 },
        { size: '75x30 (Single)', price: 2200 },
        { size: '75x36 (Single)', price: 2400 },
        { size: '78x30 (Single)', price: 2600 },
        { size: '78x36 (Single)', price: 2800 },
        { size: '84x30 (Single)', price: 3000 },
        { size: '84x36 (Single)', price: 3500 },
      ],
      Double: [
        { size: '72x42 (Double)', price: 1800 },
        { size: '72x48 (Double)', price: 1900 },
        { size: '75x42 (Double)', price: 2200 },
        { size: '75x48 (Double)', price: 2400 },
        { size: '78x42 (Double)', price: 2600 },
        { size: '78x48 (Double)', price: 2800 },
        { size: '84x42 (Double)', price: 3000 },
        { size: '84x48 (Double)', price: 3500 },
      ],
      Queen: [
        { size: '72x60 (Queen)', price: 3000 },
        { size: '72x66 (Queen)', price: 3200 },
        { size: '75x60 (Queen)', price: 3500 },
        { size: '75x66 (Queen)', price: 3700 },
        { size: '78x60 (Queen)', price: 4000 },
        { size: '78x66 (Queen)', price: 4200 },
        { size: '84x60 (Queen)', price: 4500 },
        { size: '84x66 (Queen)', price: 4700 },
      ],
      King: [
        { size: '72x72 (King)', price: 5000 },
        { size: '75x72 (King)', price: 5500 },
        { size: '78x72 (King)', price: 6000 },
        { size: '84x72 (King)', price: 6500 },
      ],
    }),
    []
  );

  // Function to calculate the total price based on selected category, size, and thickness
  const calculateTotalPrice = () => {
    if (currCategory && currentSize && currThickness) {
      return (
        (currCategory?.price || 0) +
        (currentSize?.price || 0) +
        (currThickness?.price || 0)
      );
    }
    return 0;
  };

  // Fetch product details by ID
  const handleFetchProduct = useCallback(() => {
    const products = demoProducts;
    if (products?.length > 0 && id) {
      const product = products.find((r) => r.id == id);
      if (product) {
        setProductDetails(product);
      }
    }
  }, [id]);

  // Set default values for Category, Size, and Thickness
  useEffect(() => {
    if (categories?.length > 0) {
      setCurrentCategory(categories[0]); // Default to the first category
    }
  }, [categories]);

  useEffect(() => {
    if (currCategory) {
      setCurrentSize(allSizes[currCategory?.name]?.[0]); // Default to the first size of the selected category
    }
  }, [currCategory, allSizes]);

  useEffect(() => {
    handleFetchProduct();
  }, [id, handleFetchProduct]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setScrollDirection('down'); // scrolling down
      } else if (scrollTop < lastScrollTop) {
        setScrollDirection('up'); // scrolling up
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // prevent negative scroll value
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);
  const discountPercent = Math.round(
    ((productDetails?.actualPrice - productDetails?.discountPrice) /
      productDetails?.actualPrice) *
    100
  );
  const handleChangeWishList = async () => {
    if (hasWishLists && isAuthenticated) {
      const productId = productDetails?.id;
      const userId = user;
      const resp = await deleteWishlistById(userId, productId);
      if (resp && resp?.data) {
        if (resp?.data?.success) {
          setHasWishLists(!hasWishLists);
        }
      }
    } else {
      if (isAuthenticated) {
        const productId = productDetails?.id;
        const userId = user;
        const resp = await addProductToUserWishList(userId, productId);
        if (resp && resp?.data) {
          if (resp?.data?.success) {
            setHasWishLists(!hasWishLists);
          }
        }
      } else {
        navigate('/LogIn');
      }
    }
  };

  const handleAddProctToCart = async (e) => {
    e.preventDefault();
    try {
      const size = currentSize.size ? currentSize.size : '';
      const thickness = currThickness.thickness ? currThickness.thickness : '';
      const category = currCategory?.name ? currCategory?.name : '';
      const price = calculateTotalPrice();
      const response = await addProductToCartById(
        id,
        user,
        1,
        category,
        size,
        thickness,
        price,
        currCategory?.price,
        currThickness?.price,
        currentSize?.price
      );
      if (response && response?.data) {
        if (response?.data?.success) {
          await handleFetchCartList();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleBuyNow = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const size = currentSize.size ? currentSize.size : '';
      const thickness = currThickness.thickness ? currThickness.thickness : '';
      const category = currCategory?.name ? currCategory?.name : '';
      const price = calculateTotalPrice();
      const response = await addProductToCartById(
        id,
        user,
        1,
        category,
        size,
        thickness,
        price,
        currCategory?.price,
        currThickness?.price,
        currentSize?.price
      );
      if (response && response?.data) {
        if (response?.data?.success) {
          navigate(`/buy-product-now/${id}`);
        }
      }
    } else {
      navigate('/LogIn');
    }
  };
  return (
    <div className="bg-gray-200 p-3 ">
      <div className="w-full mx-auto bg-white rounded-lg">
        <div className="flex flex-col lg:flex-row lg:space-x-6 w-full p-6 min-h-screen">
          {/* Left Side: Product Images in Carousel */}
          <div className="lg:w-1/2 w-full mb-4 lg:mb-0 h-full">
            <ProductImageSlider images={productDetails?.productImages} />
          </div>

          {/* Right Side: Product Details */}
          <div className="lg:w-1/2 w-full md:px-3">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold mb-4">
                  {productDetails?.name}
                </h1>
                <div className=" animate-slideUp flex items-center p-2 flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div
                    onClick={() => {
                      handleChangeWishList();
                    }}
                    title={`${hasWishLists ? 'Wishlisted' : 'Add to Favourites'}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0 cursor-pointer"
                  >
                    {hasWishLists ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" // This makes the icon fill with the current text color
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="text-l text-blue-700" // Ensure this class applies the blue color
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="text-l text-blue-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Rating rating={productDetails?.rating} />
                <p className="ms-2 text-sm font-bold text-gray-900 ">
                  {productDetails.rating} / 5
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                <span className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline ">
                  {productDetails.reviews} reviews
                </span>
              </div>
              <div className="mt-2 mr-3">
                <p className="text-gray-700">
                  {productDetails?.productDescription}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-md">₹</span>
                <span className="text-2xl font-semibold">
                  {calculateTotalPrice() == 0
                    ? productDetails?.discountPrice
                    : calculateTotalPrice()}
                </span>
                <span className="text-xs text-gray-700 font-semibold mt-2">
                  onwards
                </span>
                <span className="ml-2 text-sm font-medium text-green-500 mt-2">
                  ({discountPercent}% off)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-md font-medium text-gray-700 line-through">
                  M.R.P: ₹{productDetails?.actualPrice}
                </span>
                <span className=" text-xs">(Inclusive of all taxes)</span>
              </div>
              <div className="divide-y divide-dashed">
                <div>
                  <p className="text-gray-700">
                    {productDetails?.totalOrders}+ bought in past month
                  </p>
                </div>
              </div>
              <div className="flex flex-row mt-2">
                <div className=" animate-slideUp flex items-center p-2 flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="text-l text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="font-semibold text-gray-700">
                      Upto 10 Year Warranty
                    </span>
                  </div>
                </div>
                <div className=" animate-slideUp flex items-center p-2 flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 sm:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="text-l text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                      />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="font-semibold text-gray-700">
                      Naturally aligns your spine
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold font-mono">CATEGORY</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setCurrentCategory(category);
                        const element =
                          allSizes[
                          currCategory?.name ? currCategory?.name : 'Small'
                          ][0];
                        const option = thicknessOptions[0];
                        setCurrentSize(element);
                        setCurrentThickness(option);
                      }}
                      className={`group border ${currCategory?.name == category.name ? 'bg-blue-400 text-white' : 'text-gray-700'} h-7 w-24 rounded hover:bg-blue-400 hover:text-white transition duration-300`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold font-mono ">SIZE</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {allSizes[
                    currCategory?.name ? currCategory?.name : 'Small'
                  ]?.map((element) => (
                    <button
                      key={element?.size}
                      onClick={() => {
                        setCurrentSize(element);
                        // setFinalPrice(finalPrice ? productDetails?.discountPrice + element?.price : productDetails?.discountPrice + element?.price);
                      }}
                      className={`group border ${currentSize?.size === element?.size ? 'bg-blue-400' : 'text-gray-700'} h-7 w-32 rounded hover:bg-blue-400 hover:text-white transition duration-300`}
                    >
                      <span
                        className={`text-sm group-hover:text-white ${currentSize?.size === element?.size ? 'text-white' : 'text-gray-700'}`}
                      >
                        {element?.size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold font-mono ">THICKNESS</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {thicknessOptions.map((option) => (
                    <button
                      key={option.thickness}
                      onClick={() => setCurrentThickness(option)}
                      className={`group border ${currThickness.thickness === option.thickness ? 'bg-blue-400' : 'text-gray-700'} h-7 w-24 rounded hover:bg-blue-400 hover:text-white transition duration-300`}
                    >
                      <span
                        className={`group-hover:text-white text-sm  ${currThickness.thickness === option.thickness ? 'text-white' : 'text-gray-700'}`}
                      >
                        {`${option.thickness}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:justify-center">
              <button
                onClick={(e) => handleBuyNow(e)}
                className="border border-blue-400 text-blue-600 p-2 rounded-lg w-full md:w-1/2 h-12 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 11h14M7 11v7a2 2 0 002 2h6a2 2 0 002-2v-7"
                  />
                </svg>
                Buy now
              </button>
              {isProductAddedToCart ? (
                <button
                  onClick={() => navigate('/Cart')}
                  className="border bg-blue-400 text-white p-2 rounded-lg w-full md:w-1/2 h-12 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Added to Cart
                </button>
              ) : (
                <button
                  onClick={(e) => handleAddProctToCart(e)}
                  className="border bg-blue-400 text-white p-2 rounded-lg w-full md:w-1/2 h-12 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l1.35-6.35A1 1 0 0017.38 5H6.21l-.94-4H3m4 16a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                  Add to Cart
                </button>
              )}
            </div>

            <br />
          </div>
        </div>
        <div className="bg-gray-100 p-8">
          <br />
          <ProductSpecifications scrollDirection={scrollDirection} />
          <br />
        </div>
        <div
          className={`bg-white ${scrollDirection === 'up' ? 'animate-slideDown' : 'animate-slideUp'
            }`}
        >
          <br />
          <ProductKeyFeatures />
          <br />
        </div>
        <div className="bg-gray-100 p-8">
          <br />
          <ProductCustomerReviews
            productDetails={productDetails}
            scrollDirection={scrollDirection}
          />
          <br />
        </div>
        <div className="bg-white p-8">
          <br />
          <ProductFaq
            productDetails={productDetails}
            scrollDirection={scrollDirection}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
