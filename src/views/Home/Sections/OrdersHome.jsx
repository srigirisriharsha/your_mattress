import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { demoProducts } from '../../../components/CustomComponents/utils';
import { useNavigate } from 'react-router-dom';
// import emptyCart from '../../../assets/Images/emptyCart.png';
import './sections.css';
const OrdersHome = ({ productsByUser }) => {
  const navigate = useNavigate();

  const goToProductView = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Group products into pairs of 2
  const groupedProducts = [];
  for (let i = 0; i < demoProducts.length; i += 3) {
    groupedProducts.push(demoProducts.slice(i, i + 3));
  }

  return (
    <div className="animate-slideUp bg-gray-50">
      <div className="w-full mx-auto p-4 md:p-10">
        <div className="">
          <div className="flex flex-col justify-center items-center">
            <h1
              className="text-xl md:text-3xl  text-center"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              Your Recent Orders
            </h1>
            <div className="w-[10%] h-[1.5px] bg-blue-500 mt-1 items-center"></div>
          </div>
        </div>

        <div className="w-full mt-4 overflow-auto">
          <div className="flex overflow-x-auto xs:no-scrollbar scroll-smooth p-1 md:p-4 space-x-3 md:justify-left gap-6">
            {productsByUser.map((product, index) => (
              <div
                key={index}
                className="flex-none shadow-lg bg-white  rounded-lg w-72" // Set a fixed width for cards
              >
                <div className="overflow-hidden rounded-t-lg w-full h-48">
                  <img
                    onClick={() => goToProductView(product.demoProductObj.id)}
                    src={product.demoProductObj.image}
                    alt={product.demoProductObj.name}
                    className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="space-y-3 p-2">
                  <div>
                    <p
                      onClick={() => goToProductView(product.demoProductObj.id)}
                      className="text-left font-semibold text-lg text-gray-700 cursor-pointer hover:underline"
                    >
                      {product.demoProductObj.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {product.cartDataObj?.size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Thickness: {product.cartDataObj?.thickness}
                    </p>

                    <div className="mt-3 mb-2">
                      <div className="flex justify-between gap-8">
                        <p className="text-lg text-black">
                          <b>₹ {product.cartDataObj?.price}</b>
                        </p>
                        <div className="w-24 text-center">
                          <p className="text-sm font-semibold border border-orange-500 text-orange-500 bg-white p-1 rounded-lg">
                            {product.cartDataObj.order_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersHome;
