import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import { demoProducts } from '../../../components/CustomComponents/utils';
import ProductImageSlider from '../../../components/Slider/Slider';
import { useAuth } from '../../../context/MainContext';
import { FaCartShopping } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';
const AdminAddOrderProduct = () => {
  const { adminCart, setAdminCart } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [currCategory, setCurrentCategory] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [currThickness, setCurrentThickness] = useState({
    thickness: '5',
    price: 0,
  });

  const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [hasWishLists, setHasWishLists] = useState(false);
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
  const handleFetchCartList = useCallback(async () => {
    if (adminCart?.length > 0) {
      const cartObj = adminCart?.find(
        (e) => e.product_id === id || e.id === id
      );
      if (cartObj) {
        setIsProductAddedToCart(true);
      }
    }
  }, [adminCart, id]);

  useEffect(() => {
    handleFetchCartList();
  }, [id, handleFetchCartList]);

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
        // setScrollDirection('down'); // scrolling down
      } else if (scrollTop < lastScrollTop) {
        // setScrollDirection('up'); // scrolling up
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // prevent negative scroll value
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const handleAddProctToCart = async (e) => {
    e.preventDefault();
    try {
      const size = currentSize.size ? currentSize.size : '';
      const thickness = currThickness.thickness ? currThickness.thickness : '';
      const category = currCategory?.name ? currCategory?.name : '';
      const price = calculateTotalPrice();
      const obj = {
        id,
        quantity: 1,
        category,
        size,
        thickness,
        price,
        categoryPrice: currCategory?.price,
        thicknessPrice: currThickness?.price,
        sizePrice: currentSize?.price,
      };
      if (adminCart?.length > 0) {
        const cartObj = adminCart?.find(
          (e) => e.product_id === id || e.id === id
        );
        if (cartObj) {
          setIsProductAddedToCart(true);
          alert('Alredy in cart');
        } else {
          setAdminCart([...adminCart, obj]);
        }
      } else {
        setAdminCart([...adminCart, obj]);
      }

      // const response = await addProductToCartById(
      //   id,
      //   user,
      //   1,
      //   category,
      //   size,
      //   thickness,
      //   price,
      //   currCategory?.price,
      //   currThickness?.price,
      //   currentSize?.price
      // );
      // if (response && response?.data) {
      //   if (response?.data?.success) {
      //     await handleFetchCartList();
      //   }
      // }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div className="bg-gray-200 p-3 ">
      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <div className="flex justify-between ">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Add Order
          </h1>
          <div className="flex justify-between gap-2">
            <div>
              <button
                onClick={() => navigate('/admin/add-order/')}
                className="border border-black gap-2  text-black p-2 rounded-lg w-full  h-10   flex items-center justify-center"
              >
                <FaArrowLeft />
                Back
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate('/admin/Cart/')}
                className="border bg-black  text-white p-2 rounded-lg w-full gap-2 h-10 flex items-center justify-center"
              >
                <FaCartShopping />
                Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-2"></div>
      </div>
      <div className="w-full mx-auto bg-white rounded-lg">
        <div className="flex flex-col lg:flex-row lg:space-x-6 w-full p-6 min-h-screen">
          {/* Left Side: Product Images in Carousel */}
          <div className="lg:w-1/2 w-full mb-4 lg:mb-0 h-full">
            <ProductImageSlider images={productDetails?.productImages} />
          </div>
          {/* Right Side: Product Details */}
          <div className="lg:w-1/2 w-full md:px-3">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold mb-4">
                {productDetails?.name}
              </h1>
            </div>
            <div>
              <div className="mt-2">
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
                      className={`group border ${currCategory?.name == category.name ? 'bg-black text-white' : 'text-gray-700'} h-7 w-24 rounded hover:bg-black hover:text-white transition duration-300`}
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
                      className={`group border ${currentSize?.size === element?.size ? 'bg-black' : 'text-gray-700'} h-7 w-32 rounded hover:bg-black hover:text-white transition duration-300`}
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
                      className={`group border ${currThickness.thickness === option.thickness ? 'bg-black' : 'text-gray-700'} h-7 w-24 rounded hover:bg-black hover:text-white transition duration-300`}
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
            <div className="flex items-center mt-4">
              Total Price : <> </>
              <span className="text-md">₹</span>
              <span className="text-2xl font-semibold">
                {calculateTotalPrice() == 0
                  ? productDetails?.discountPrice
                  : calculateTotalPrice()}
              </span>
            </div>
            <div className="mt-4 flex flex-col  space-y-3 md:space-y-0 md:space-x-3 w-full ">
              {isProductAddedToCart ? (
                <button
                  onClick={() => navigate('/admin/Cart/')}
                  className="border border-black hover:bg-black hover:text-white text-black p-2 rounded-lg w-full  h-12 flex items-center justify-center"
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
                  className="border border-black hover:bg-black hover:text-white text-black p-2 rounded-lg w-full  h-12 flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default AdminAddOrderProduct;
