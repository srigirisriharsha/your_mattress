import React, { useState } from 'react';
import { FaPlusCircle, FaStar } from 'react-icons/fa';
import ImagesUploader from './ImagesUploader';
import { generateRandomId } from '../../../components/CustomComponents/utils';
import { uploadImage } from '../../../services/shop/shopservice';
import { addProduct } from '../../../services/admin/adminservice';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [faqAddOpen, setFaqAddOpen] = useState(false);
  const [faqdetails, setFAQDetails] = useState({ question: '', answers: '' });
  const [customerReviewsList, setcustomerReviewsList] = useState([]);
  const [customerReviewsAddOpen, setcustomerReviewsAddOpen] = useState(false);
  const [customerReviewsdetails, setcustomerReviewsDetails] = useState({
    name: '',
    rating: '',
    title: '',
    comments: '',
    date: '',
  });
  const [ratings, setRatings] = useState({
    fiveStar: '',
    fourStar: '',
    threeStar: '',
    twoStar: '',
    oneStar: '',
  });
  const [productDetails, setProductDetails] = useState({ type: 'mattress' });
  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: value,
    }));
  };
  const handleAddFAQSection = () => {
    if (faqAddOpen == false) {
      setFaqAddOpen(true);
    }
  };
  const handleAddCustomerReviewsSection = () => {
    if (customerReviewsAddOpen == false) {
      setcustomerReviewsAddOpen(true);
    }
  };
  const handleAddCustomerReviews = (e) => {
    try {
      e.preventDefault();
      const obj = {
        name: customerReviewsdetails.name,
        rating: customerReviewsdetails.rating,
        title: customerReviewsdetails.title,
        comments: customerReviewsdetails.comments,
        date: customerReviewsdetails.date,
        key: customerReviewsList?.length + 1,
      };
      setcustomerReviewsList([...customerReviewsList, obj]);
      setcustomerReviewsAddOpen(false);
      setcustomerReviewsDetails({
        name: '',
        rating: '',
        title: '',
        comments: '',
        date: '',
      });
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleAddFAQ = (e) => {
    try {
      e.preventDefault();
      const obj = {
        question: faqdetails.question,
        answers: faqdetails.answers,
        key: faqList?.length + 1,
      };
      setFaqList([...faqList, obj]);
      setFaqAddOpen(false);
      setFAQDetails({ question: '', answers: '' });
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleDeleteCustomerReview = (currCustomerReviewKey) => {
    try {
      const updatedList = [...customerReviewsList];
      const index = updatedList?.findIndex(
        (r) => r.key == currCustomerReviewKey
      );
      if (index >= 0) {
        updatedList.splice(index, 1);
        setcustomerReviewsList(updatedList);
      }
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleDeleteFAQ = (currFaqKey) => {
    try {
      const updatedList = [...faqList];
      const index = updatedList?.findIndex((r) => r.key == currFaqKey);
      if (index >= 0) {
        updatedList.splice(index, 1);
        setFaqList(updatedList);
      }
    } catch (error) {
      console.log('err', error);
    }
  };
  console.log('productsDetials', productDetails);
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      let productLinks = [];
      for (let i = 0; i < images?.length; i++) {
        const currImage = images[0];
        const formData = new FormData();
        formData.append('image', currImage);
        const response = await uploadImage(formData);
        if (response && response?.data?.success) {
          if (response?.data?.imageUrl) {
            productLinks.push(response?.data?.imageUrl);
          }
        }
      }
      console.log('productLinks', productLinks);
      let finalObject = { ...productDetails };
      finalObject.id = finalObject.key = generateRandomId('product', '_');
      finalObject.image = productLinks[0];
      finalObject.productImages = productLinks;
      finalObject.reviews =
        Number(ratings?.fiveStar) +
        Number(ratings?.fourStar) +
        Number(ratings?.threeStar) +
        Number(ratings?.twoStar) +
        Number(ratings?.oneStar);
      finalObject.customerReviews = customerReviewsList;
      finalObject.faq = faqList;
      console.log('finalObject', finalObject);

      const result = await addProduct(finalObject);
      if (result && result?.data?.success) {
        navigate('/admin/store-products');
      }
      console.log('result', result);
    } catch (error) {
      console.log('err', error);
    }
  };
  return (
    <div className="bg-red min-h-screen w-full p-4">
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex gap-2 items-center">
          <FaPlusCircle className="h-7 w-7" />

          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Add Product
          </h1>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-1"></div>
      </div>
      <div className="p-5 w-full bg-white mt-6">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label>Product Type :</label>
              <select
                className="border border-gray-500 rounded  p-1"
                value={productDetails?.type}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, type: e.target.value })
                }
                required
              >
                <option value={'mattress'}>Mattress</option>
                <option value={'pillow'}>Pillow</option>
                <option value={'bedsheet'}>Bed Sheets</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label>Product Name :</label>
              <input
                className="border border-gray-500 rounded p-1"
                value={productDetails?.name}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, name: e.target.value })
                }
                required
                placeholder="Enter Product Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Overall Rating :</label>
              <input
                className="border border-gray-500 rounded  p-1"
                type="number"
                value={productDetails?.rating}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    rating: e.target.value,
                  })
                }
                required
                placeholder="Enter Overall Rating"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Total Orders(Estimate) :</label>
              <input
                className="border border-gray-500 rounded  p-1"
                placeholder="Example : 5K, 6K"
                value={productDetails?.totalOrders}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    totalOrders: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Actual Price :</label>
              <input
                type="number"
                className="border border-gray-500 rounded  p-1"
                placeholder="Enter actual price of product"
                value={productDetails?.actualPrice}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    actualPrice: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Discount Price (After Discount) :</label>
              <input
                type="number"
                className="border border-gray-500 rounded  p-1"
                placeholder="Enter price after discount"
                value={productDetails?.discountPrice}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    discountPrice: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <label>Product Description : </label>
            <textarea
              className="w-full border border-gray-500 rounded-lg p-2"
              rows={5}
              placeholder="Enter Product Description"
              value={productDetails?.productDescription}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  productDescription: e.target.value,
                })
              }
            ></textarea>
          </div>
        </form>
        {/*Images Section*/}
        <ImagesUploader images={images} setImages={setImages} />
        {/*FAQ*/}
        <div className="p-5 w-full bg-gray-50 mt-6">
          {/* Upload Button */}
          <div className="text-xl font-semibold">
            Add FAQs(Default) <span className="text-red-400">*</span>
          </div>
          <div className="flex justify-center">
            <button
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAddFAQSection}
            >
              Add New FAQ
            </button>
          </div>
          {faqAddOpen && (
            <div>
              <form onSubmit={handleAddFAQ}>
                <div className="w-full p-2 flex flex-col">
                  <div className="flex justify-end flex-row gap-2">
                    <button
                      className="bg-black text-white rounded-lg p-1"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="border border-black text-black rounded-lg p-1"
                      onClick={() => setFaqAddOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    <input
                      className="w-full border border-gray-500 rounded-lg p-2"
                      placeholder="Enter Question"
                      value={faqdetails.question}
                      onChange={(e) =>
                        setFAQDetails({
                          ...faqdetails,
                          question: e.target.value,
                        })
                      }
                      required
                    />
                    <textarea
                      placeholder="Enter Answer"
                      value={faqdetails.answers}
                      className="w-full border border-gray-500 rounded-lg p-2"
                      onChange={(e) =>
                        setFAQDetails({
                          ...faqdetails,
                          answers: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          )}
          {faqList?.length > 0 && (
            <>
              {faqList?.map((faq, index) => (
                <div className="p-2" key={index}>
                  <div className="bg-white w-full p-3 rounded-lg shadow-md shadow-gray-500">
                    <div className="flex flex-row justify-between">
                      <p className="text-lq font-semibold underline">
                        FAQ - {index + 1}
                      </p>
                      <p
                        className=" text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteFAQ(faq.key)}
                      >
                        Delete
                      </p>
                    </div>

                    <p className="text-gray-600">
                      <span className="font-semibold mr-3">Question : </span>
                      {faq?.question}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold mr-3">Answer : </span>
                      {faq?.answers}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/*Customer Reviews*/}
        <div className="p-5 w-full bg-gray-50 mt-6">
          {/* Upload Button */}
          <div className="text-xl font-semibold">
            Add Customer Reviews(Default){' '}
            <span className="text-red-400">*</span>
          </div>
          <div className="flex justify-center">
            <button
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAddCustomerReviewsSection}
            >
              Add New FAQ
            </button>
          </div>
          {customerReviewsAddOpen && (
            <div>
              <form onSubmit={handleAddCustomerReviews}>
                <div className="flex justify-end flex-row gap-2 mt-2">
                  <button
                    className="bg-black text-white rounded-lg p-1"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="border border-black text-black rounded-lg p-1"
                    onClick={() => setFaqAddOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col gap-1">
                    <label>Customer Name :</label>
                    <input
                      className="border border-gray-500 rounded p-1"
                      value={customerReviewsdetails.name}
                      onChange={(e) =>
                        setcustomerReviewsDetails({
                          ...customerReviewsdetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Customer Rating :</label>
                    <input
                      className="border border-gray-500 rounded p-1"
                      value={customerReviewsdetails.rating}
                      type="number"
                      onChange={(e) =>
                        setcustomerReviewsDetails({
                          ...customerReviewsdetails,
                          rating: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Title :</label>
                    <input
                      className="border border-gray-500 rounded p-1"
                      value={customerReviewsdetails.title}
                      onChange={(e) =>
                        setcustomerReviewsDetails({
                          ...customerReviewsdetails,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Comments :</label>
                    <input
                      className="border border-gray-500 rounded p-1"
                      value={customerReviewsdetails.comments}
                      onChange={(e) =>
                        setcustomerReviewsDetails({
                          ...customerReviewsdetails,
                          comments: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Date :</label>
                    <input
                      className="border border-gray-500 rounded p-1"
                      type="date"
                      value={customerReviewsdetails.date}
                      onChange={(e) =>
                        setcustomerReviewsDetails({
                          ...customerReviewsdetails,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
          {customerReviewsList?.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {customerReviewsList?.map((customerReview, index) => (
                  <div className="p-2" key={index}>
                    <div className="bg-white w-full p-3 rounded-lg shadow-md shadow-gray-500">
                      <div className="flex flex-row justify-between">
                        <p className="text-lq font-semibold underline">
                          Review - {index + 1}
                        </p>
                        <p
                          className=" text-red-500 hover:underline cursor-pointer"
                          onClick={() =>
                            handleDeleteCustomerReview(customerReview.key)
                          }
                        >
                          Delete
                        </p>
                      </div>

                      <div className="text-gray-600">
                        <div className="flex flex-wrap">
                          <span className="font-semibold mr-3 min-w-[80px]">
                            Name
                          </span>
                          <span className="w-[10px] text-center">:</span>
                          <span>{customerReview?.name}</span>
                        </div>
                        <div className="flex flex-wrap">
                          <span className="font-semibold mr-3 min-w-[80px]">
                            Rating
                          </span>
                          <span className="w-[10px] text-center">:</span>
                          <span>{customerReview?.rating}</span>
                        </div>
                        <div className="flex flex-wrap">
                          <span className="font-semibold mr-3 min-w-[80px]">
                            Title
                          </span>
                          <span className="w-[10px] text-center">:</span>
                          <span>{customerReview?.title}</span>
                        </div>
                        <div className="flex flex-wrap">
                          <span className="font-semibold mr-3 min-w-[80px]">
                            Comments
                          </span>
                          <span className="w-[10px] text-center">:</span>
                          <span>{customerReview?.comments}</span>
                        </div>
                        <div className="flex flex-wrap">
                          <span className="font-semibold mr-3 min-w-[80px]">
                            Date
                          </span>
                          <span className="w-[10px] text-center">:</span>
                          <span>{customerReview?.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {/*Customer cout*/}
        <div className="p-5 w-full bg-gray-50 mt-6">
          <div className="text-xl font-semibold">
            Add Customer Reviews Count(Default){' '}
            <span className="text-red-400">*</span>
          </div>
          <form className="space-y-4 max-w-md mx-auto mt-2">
            {/* 5 Star Rating */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <span>5</span>
                <FaStar className="text-yellow-500" /> {/* Star icon */}
              </span>
              <input
                type="number"
                name="fiveStar"
                value={ratings.fiveStar}
                onChange={handleInputChange}
                placeholder="Enter count"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 4 Star Rating */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <span>4</span>
                <FaStar className="text-yellow-500" />
              </span>
              <input
                type="number"
                name="fourStar"
                value={ratings.fourStar}
                onChange={handleInputChange}
                placeholder="Enter count"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 3 Star Rating */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <span>3</span>
                <FaStar className="text-yellow-500" />
              </span>
              <input
                type="number"
                name="threeStar"
                value={ratings.threeStar}
                onChange={handleInputChange}
                placeholder="Enter count"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 2 Star Rating */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <span>2</span>
                <FaStar className="text-yellow-500" />
              </span>
              <input
                type="number"
                name="twoStar"
                value={ratings.twoStar}
                onChange={handleInputChange}
                placeholder="Enter count"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 1 Star Rating */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <span>1</span>
                <FaStar className="text-yellow-500" />
              </span>
              <input
                type="number"
                name="oneStar"
                value={ratings.oneStar}
                onChange={handleInputChange}
                placeholder="Enter count"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
        <div className="mt-3 mx-auto min-w-64 flex justify-center">
          <button
            className="bg-black text-white p-4 w-full"
            onClick={handleAddProduct}
          >
            {' '}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
