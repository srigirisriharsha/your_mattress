import React, { useState } from 'react';
import matricesimage7 from '../../assets/Images/matrices/matresswake.avif';
import indianFlag from '../../assets/Images/indianFlag.png';
import matricesimage3 from '../../assets/Images/matrices/matricesimage6.jpg';
import { addBulkOrder } from '../../services/user/userservice';
import moment from 'moment';
const BulkOrders = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [orderValues, setOrderValues] = useState({
    name: '',
    companyName: '',
    email: '',
    mobile: '',
    message: '',
    address: '',
    createdDate: moment().format('DD-MM-YYYY'),
    status: 'Open',
    assignedTo: 1,
  });
  const handleAddBuldOrder = async (e) => {
    try {
      e.preventDefault();
      const response = await addBulkOrder(orderValues);
      if (response && response?.data) {
        if (response?.data?.success) {
          setIsSubmit(true);
          alert('Soon you will receive a call from our side');
        }
      }
    } catch (error) {
      console.log('err', error);
    }
  };
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div>
          <img
            src={matricesimage7}
            alt="Thumbnail"
            className="thumbnail-image w-full cursor-pointer h-52 md:h-full lg:h-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className=" w-full md:w-1/2">
            <div className="flex flex-col w-full p-4 justify-center items-center md:p-6 bg-gray-100">
              <div className="flex flex-col justify-center items-center w-full ">
                <h2 className="text-center text-2xl font-semibold  ">
                  Enquire Now
                </h2>
                <h4 className="text-center text-base font-normal text-gray-500 mt-1">
                  Only bulk orders above 1 lakh are accepted
                </h4>
              </div>
              <form className="w-4/5 mt-4 " onSubmit={handleAddBuldOrder}>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300  mb-4"
                    value={orderValues?.name}
                    required
                    onChange={(e) =>
                      setOrderValues({ ...orderValues, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full p-2 border border-gray-300  mb-4"
                    value={orderValues?.companyName}
                    onChange={(e) =>
                      setOrderValues({
                        ...orderValues,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col md:flex-row space-x-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="md:w-1/2 w-full p-2 border border-gray-300 mb-4"
                    value={orderValues?.email}
                    onChange={(e) =>
                      setOrderValues({ ...orderValues, email: e.target.value })
                    }
                  />
                  <div className="md:w-1/2 w-ful flex items-start mb-3">
                    <button
                      id="dropdown-phone-button"
                      className="flex-shrink-0 z-10 inline-flex items-center  py-2.5 md:px-4 text-sm font-medium text-center border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                      type="button"
                    >
                      <img
                        src={indianFlag} // Indian flag image URL
                        alt="India Flag"
                        className="h-4 w-4 me-2"
                      />
                      +91
                    </button>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="phone-input"
                        name="mobileNumber"
                        className="block p-2.5 w-full z-20 text-sm text-black bg-white border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        pattern="[6-9][0-9]{9}"
                        placeholder="9876543210"
                        maxLength={10}
                        required
                        value={orderValues?.mobile}
                        onChange={(e) =>
                          setOrderValues({
                            ...orderValues,
                            mobile: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <textarea
                    className="w-full p-2 border border-gray-300  mb-2"
                    placeholder="Message"
                    value={orderValues?.message}
                    onChange={(e) =>
                      setOrderValues({
                        ...orderValues,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div>
                  <textarea
                    className="w-full p-2 border border-gray-300 mb-4"
                    placeholder="Address"
                    value={orderValues?.address}
                    onChange={(e) =>
                      setOrderValues({
                        ...orderValues,
                        address: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                {!isSubmit ? (
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h4a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM7 13h10M10 17h4m-2-6v6"
                      />
                    </svg>
                    <span>Request a Quotation / Call</span>
                  </button>
                ) : (
                  <button className="flex items-center justify-center w-full bg-green-600 text-white font-semibold p-3 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                    <span>Query Generated</span>
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="hidden md:flex w-full md:w-1/2 p-6 items-center justify-center">
            <div className="w-4/5">
              <img
                src={matricesimage3}
                alt="thumbnail"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;
