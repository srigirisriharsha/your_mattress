import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { demoProducts } from '../../../components/CustomComponents/utils';
import { useNavigate } from 'react-router-dom';
// import emptyCart from '../../../assets/Images/emptyCart.png';
import './sections.css';
const Bestsellers = () => {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    getBestSellers();
  }, []);
  const getBestSellers = () => {
    // Sort the products by rank in ascending order
    let sortedItems = demoProducts.sort((a, b) => a.rank - b.rank);

    // Slice the first 5 items (i.e., rank 1, 2, 3, 4, 5) and store in a new variable
    const topRankedItems = sortedItems.slice(0, 5);

    // Log and set only the top 5 ranked products
    console.log('Top 5 ranked items:', topRankedItems);
    setProductsList(topRankedItems);
  };
  const goToProductView = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Group products into pairs of 2
  const groupedProducts = [];
  for (let i = 0; i < demoProducts.length; i += 3) {
    groupedProducts.push(demoProducts.slice(i, i + 3));
  }

  return (
    <div className="bg-white animate-slideUp">
      <div className="w-full mx-auto p-4 md:p-6">
        <div className="bg-white">
          <div className="flex flex-col justify-center items-center">
            <h1
              className="text-xl md:text-3xl  text-center"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              Best Selling Products
            </h1>
            <div className="w-[10%] h-[1.5px] bg-blue-500 mt-1 items-center"></div>
          </div>
        </div>

        <div className="w-full overflow-hidden mt-3">
          <div className="flex overflow-x-auto no-scrollbar p-1 md:p-4 space-x-3 md:justify-left gap-6">
            {productsList.map((product, index) => (
              <div
                key={index}
                className="flex-none shadow-lg bg-white  rounded-lg w-72" // Set a fixed width for cards
              >
                <div className="overflow-hidden rounded-t-lg w-full h-64">
                  <img
                    onClick={() => goToProductView(product.id)}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-3 p-2">
                  <div>
                    <p
                      onClick={() => goToProductView(product.id)}
                      className="text-center font-semibold text-lg text-gray-700 cursor-pointer hover:underline"
                    >
                      {product.name}
                    </p>
                    {/* <div className="flex items-center">
                      <Rating rating={product?.rating} />
                      <p className="ms-2 text-sm font-bold text-gray-900 ">
                        {product.rating} / 5
                      </p>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                      <span className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline ">
                        {product.reviews} reviews
                      </span>
                    </div>
                    <br />
                    <PriceComponent
                      actualPrice={product.actualPrice}
                      discountPrice={product.discountPrice}
                    /> */}
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
export default Bestsellers;
