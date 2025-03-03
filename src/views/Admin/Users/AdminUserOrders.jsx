import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoProducts } from '../../../components/CustomComponents/utils';
import { getProductInOrderById } from '../../../services/shop/shopservice';
import 'react-toastify/dist/ReactToastify.css';
import { orderStatusArray } from '../../../components/CustomComponents/Constants';
import { getUserDetailsById } from '../../../services/user/userservice';
import { useAuth } from '../../../context/MainContext';
import ProgressTracker from '../../orders/progressTracker';
import emptyCart from '../../../assets/Images/emptyCart.png';

const ProductCard = ({ product, goToProductViewToCart }) => {
  const [isOpen, setIsOpen] = useState(false); // Accordion product

  return (
    <div
      key={product?.key}
      className="bg-white border p-4 rounded-lg shadow-md cursor-pointer"
      onClick={() => setIsOpen(!isOpen)} // Toggle accordion
    >
      <p className="text-sm text-gray-500">
        Order Id : {product?.cartDataObj?.order_id}
      </p>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-2">
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
          <div className=" flex justify-between mt-4 lg:mt-0 lg:ml-8 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
            {product?.cartDataObj.order_status === 'Delivered' ? (
              <>
                <div className="w-24 text-center">
                  <p className="text-sm font-semibold border border-green-500 text-green-500 bg-white p-1 rounded-lg">
                    {product?.cartDataObj.order_status}
                  </p>
                </div>
                <p className="mt-4 text-sm text-gray-500">Delivered on:</p>
                <p className="text-sm font-semibold">
                  {product?.cartDataObj.delivered_date}
                </p>
              </>
            ) : (
              <>
                <div className="w-24 text-center">
                  <p className="text-sm font-semibold border border-orange-500 text-orange-500 bg-white p-1 rounded-lg">
                    {product?.cartDataObj.order_status}
                  </p>
                </div>
                <div className="m-1">
                  <p className="text-sm text-gray-500">Delivery on:</p>
                  <p className="text-sm font-semibold">
                    {product?.cartDataObj.delivery_date}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4">
          <div>
            <ProgressTracker product={product?.cartDataObj} />
          </div>
          <div className="border-t border-gray-200 ">
            {/* Additional Info */}
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
              <p className="text-sm text-gray-500">
                {product?.userObj?.house_number} , {product?.userObj?.area_name}
              </p>
              <p className="text-sm text-gray-500">
                {product?.userObj?.district_name}
              </p>
              <p className="text-sm text-gray-500">
                {product?.userObj?.state_name}
              </p>
              <p className="text-sm text-gray-500">
                Pin Code : {product?.userObj?.pincode}
              </p>
              <p className="text-sm text-gray-700">
                Mobile Number: {product?.userObj?.user_mobile}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminUserOrders = ({ userData }) => {
  const navigate = useNavigate();
  const [productsByUser, setProductsByUser] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const { setIsLoading } = useAuth();
  const fetchData = useCallback(async () => {
    try {
      const response = await getProductInOrderById(userData?.user_id);
      if (response && response.data && response.data.success) {
        const cartData = response.data.data || [];
        const cartDataPromises = cartData.map(async (f) => {
          const productObj = demoProducts?.find((e) => e?.id === f?.product_id);
          const userResp = await getUserDetailsById(f?.user_id);
          return {
            demoProductObj: productObj ? { ...productObj } : {},
            cartDataObj: { ...f },
            userObj: { ...userResp?.data?.data[0] },
          };
        });
        const resolvedCartData = await Promise.all(cartDataPromises);
        setProductsByUser(resolvedCartData);
      } else {
        setProductsByUser([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userData?.user_id]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [userData?.user_id, fetchData, setIsLoading]);

  const goToProductView = (product) => {
    navigate(`/admin/order-product/${product?.demoProductObj?.id}`, {
      product: product,
    });
  };

  const goToProductViewToCart = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredProducts = useMemo(
    () =>
      selectedStatuses.length
        ? productsByUser.filter((product) =>
            selectedStatuses.includes(product?.cartDataObj.order_status)
          )
        : productsByUser,
    [selectedStatuses, productsByUser]
  );

  return (
    <div>
      {productsByUser?.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-between gap-4 ">
          {/* Filters Section */}
          <div className="bg-white p-2 rounded-lg shadow-md w-full lg:w-1/4">
            <h3 className="font-semibold mb-2">Filters</h3>
            <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
            <div className="text-sm font-medium text-gray-700 mb-2">Status</div>
            {orderStatusArray.map((status, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id={`status-checkbox-${index}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
          <div className="w-full lg:w-3/4 overflow-y-auto h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product?.key}
                  product={product}
                  goToProductView={goToProductView}
                  goToProductViewToCart={goToProductViewToCart}
                />
              ))}
            </div>
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
  );
};

export default AdminUserOrders;
