import React, { useCallback, useEffect, useState } from 'react';
import indianFlag from '../../assets/Images/indianFlag.png';
import { useNavigate } from 'react-router-dom';
import {
  FirstLetters,
  indianStatesAndUTs,
} from '../../components/CustomComponents/utils';
import { useAuth } from '../../context/MainContext';
import {
  getUserDetailsById,
  updateUserDetailsById,
} from '../../services/user/userservice';
const Profile = () => {
  const defaultValues = {
    name: '',
    password: '',
    checkbox: false,
    mobileNumber: '',
    alternateMobileNumber: '',
    email: '',
    userAddress: '',
    houseNumber: '',
    area: '',
    district: '',
    state: '',
    pincode: '',
  };
  const { user } = useAuth();
  const [userData, setUserData] = useState(defaultValues);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(null);

  const navigate = useNavigate();
  const handleFetchUserDetails = useCallback(async () => {
    try {
      if (user) {
        const response = await getUserDetailsById(user);
        if (response && response?.data) {
          if (response?.data?.success) {
            const userDetails = response?.data?.data[0];
            if (userDetails) {
              const userObj = {
                name: userDetails?.user_name,
                checkbox: false,
                mobileNumber: userDetails?.user_mobile,
                email: userDetails?.user_email,
                userAddress: userDetails?.user_address,
                alternateMobileNumber: userDetails?.alternate_mobile,
                houseNumber: userDetails.house_number,
                area: userDetails.area_name,
                district: userDetails.district_name,
                state: userDetails.state_name,
                pincode: userDetails.pincode,
              };
              setUserData(userObj);
            }
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [user]);
  useEffect(() => {
    handleFetchUserDetails();
  }, [handleFetchUserDetails]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      return updatedUserData;
    });
  };
  // const handleCheckBoxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setUserData((prevUserData) => {
  //     const updatedUserData = { ...prevUserData, [name]: checked };

  //     return updatedUserData;
  //   });
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitButtonLoading(true);
    const userObject = {
      userId: user,
      userName: userData.name,
      userMobile: userData.mobileNumber,
      userEmail: userData.email,
      userAddress: userData.userAddress,
      alternateMobile: userData.alternateMobileNumber,
      houseNumber: userData.houseNumber,
      area: userData.area,
      district: userData.district,
      state: userData.state,
      pincode: userData.pincode,
    };
    const resp = await updateUserDetailsById(userObject);
    if (resp && resp?.data) {
      if (resp?.data?.success) {
        navigate('/LogIn');
        setUserData(defaultValues);
        setTimeout(() => {
          setIsSubmitButtonLoading(false);
          setTimeout(() => {
            setIsSubmitButtonLoading(null);
          }, 1000);
        }, 500);
      } else {
        setIsSubmitButtonLoading(null);
      }
    }
  };
  const handleCancel = () => {
    setUserData(defaultValues);
    navigate('/Home');
  };
  // const [search, setSearch] = useState('');

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const filteredStates = indianStatesAndUTs.filter((state) =>
  //   state.toLowerCase().includes(search.toLowerCase())
  // );

  const handleSelectChange = (e) => {
    setUserData({
      ...userData,
      state: e.target.value,
    });
  };
  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-200`}
    >
      <div className="w-full max-w-4xl p-4 rounded-lg">
        <div className="bg-white rounded-lg p-4 px-4 w-full shadow-[0_4px_6px_rgba(67,47,132,0.3)]">
          <h2 className="text-lg font-medium  text-center">
            <button
              className="rounded-full w-20 h-20 bg-gray-200"
              title={userData.name}
            >
              {FirstLetters(userData.name)}
            </button>
          </h2>
          <div className="grid grid-cols-1 divide-y">
            <div className="flex justify-center items-center space-x-4 mb-2">
              <div style={{ fontSize: '20px' }}>{userData.name}</div>
            </div>

            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="">
                  <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="">
                  <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
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
                      type="text"
                      name="mobileNumber"
                      className="block p-2.5 w-full z-10 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      pattern="[6-9][0-9]{9}"
                      placeholder="9876543210"
                      maxLength={10}
                      value={userData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Alternative Mobile Number */}
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
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
                      type="text"
                      name="alternateMobileNumber"
                      className="block p-2.5 w-full z-10 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      pattern="[6-9][0-9]{9}"
                      placeholder="9876543210"
                      maxLength={10}
                      value={userData.alternateMobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Fields */}
              <label className="block mb-2 mt-4 text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your House Number"
                    name="houseNumber"
                    value={userData.houseNumber}
                    onChange={handleChange}
                    required={
                      userData.area !== '' ||
                      userData.district !== '' ||
                      userData.state !== '' ||
                      userData.pincode !== ''
                    }
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Area"
                    name="area"
                    value={userData.area}
                    onChange={handleChange}
                    required={
                      userData.houseNumber !== '' ||
                      userData.district !== '' ||
                      userData.state !== '' ||
                      userData.pincode !== ''
                    }
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    District / City
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your District / City"
                    name="district"
                    value={userData.district}
                    onChange={handleChange}
                    required={
                      userData.houseNumber !== '' ||
                      userData.pincode !== '' ||
                      userData.area !== '' ||
                      userData.state !== ''
                    }
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    State
                  </label>
                  {/* <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your State"
                    name="state"
                    value={userData.state}
                    onChange={handleChange}
                    required={
                      userData.houseNumber !== '' ||
                      userData.district !== '' ||
                      userData.area !== '' ||
                      userData.pincode !== ''
                    }
                  /> */}
                  {/* <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search State"
                    value={search}
                    onChange={handleSearchChange}
                  /> */}
                  <select
                    className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="state"
                    value={userData.state}
                    onChange={handleSelectChange}
                    required={
                      userData.houseNumber !== '' ||
                      userData.district !== '' ||
                      userData.area !== '' ||
                      userData.pincode !== ''
                    }
                  >
                    <option value="">Select your State</option>
                    {indianStatesAndUTs?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Pin Code"
                    name="pincode"
                    value={userData.pincode}
                    maxLength={6}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 6) {
                        setUserData({
                          ...userData,
                          pincode: input,
                        });
                      }
                    }}
                    required={
                      userData.houseNumber !== '' ||
                      userData.district !== '' ||
                      userData.area !== '' ||
                      userData.state !== ''
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center gap-10">
                <button
                  type="submit"
                  disabled={isSubmitButtonLoading === true}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  {isSubmitButtonLoading === true
                    ? 'Updating'
                    : isSubmitButtonLoading === false
                      ? 'Updated Successfully'
                      : 'Update'}
                </button>
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
