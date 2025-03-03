import React from 'react';
import indianFlag from '../../../assets/Images/indianFlag.png';

const AdminUserProfile = ({ userData }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl rounded-lg">
        <div className="bg-white rounded-lg w-full">
          <div className="grid grid-cols-1 divide-y">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="userName"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Name"
                  value={userData?.user_name || ''}
                  readOnly
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="userEmail"
                  className="block mb-2 mt-3 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="userEmail"
                  type="email"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Email"
                  value={userData?.user_email || ''}
                  readOnly
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="flex items-center">
                  <button
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    type="button"
                  >
                    <img
                      src={indianFlag}
                      alt="India Flag"
                      className="h-4 w-4 me-2"
                    />
                    +91
                  </button>
                  <input
                    id="mobileNumber"
                    type="text"
                    className="block p-2.5 w-full z-10 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    pattern="[6-9][0-9]{9}"
                    placeholder="9876543210"
                    maxLength={10}
                    value={userData?.mobileNumber || ''}
                    readOnly
                  />
                </div>
              </div>

              {/* Alternative Mobile Number */}
              <div>
                <label
                  htmlFor="alternateMobileNumber"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Alternative Mobile Number
                </label>
                <div className="flex items-center">
                  <button
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    type="button"
                  >
                    <img
                      src={indianFlag}
                      alt="India Flag"
                      className="h-4 w-4 me-2"
                    />
                    +91
                  </button>
                  <input
                    id="alternateMobileNumber"
                    type="text"
                    className="block p-2.5 w-full z-10 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    pattern="[6-9][0-9]{9}"
                    placeholder="9876543210"
                    maxLength={10}
                    value={userData?.alternateMobileNumber || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Address Fields */}
            <div className="mt-4">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="houseNumber"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    House Number
                  </label>
                  <input
                    id="houseNumber"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your House Number"
                    value={userData?.house_number || ''}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="area"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Area
                  </label>
                  <input
                    id="area"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Area"
                    value={userData?.area_name || ''}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    District / City
                  </label>
                  <input
                    id="city"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your District / City"
                    value={userData?.district_name || ''}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your State"
                    value={userData?.state_name || ''}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Pin Code
                  </label>
                  <input
                    id="pincode"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData?.pincode || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
