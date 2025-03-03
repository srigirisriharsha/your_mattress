import React, { useCallback, useEffect, useState } from 'react';
import './DrawerNavigation.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaStore,
  FaInfoCircle,
  FaBox,
  FaPhone,
  FaSignOutAlt,
  FaClipboardList,
  FaHeart,
  FaShoppingCart,
} from 'react-icons/fa';
import { FirstLetters } from '../../components/CustomComponents/utils';
import { useAuth } from '../../context/MainContext';
import { getUserDetailsById } from '../../services/user/userservice';
const defaultValues = {
  name: '',
};
const DrawerNavigation = ({
  sideMenuOpen,
  toggleSideMenu,
  isAuthenticated,
}) => {
  const { logout, user } = useAuth();
  const [userData, setUserData] = useState(defaultValues);
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
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${sideMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSideMenu}
      ></div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-300 ${sideMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-80 flex flex-col justify-between`}
      >
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {isAuthenticated ? (
                  <button
                    className="w-10 h-10 bg-gray-200"
                    title={userData.name}
                  >
                    {FirstLetters(userData.name)}
                  </button>
                ) : (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="font-medium">
                <div className="text-sm text-blue-500">
                  {isAuthenticated ? (
                    <div>
                      <div className="text-black text-lg">{userData.name}</div>
                      <button
                        onClick={() => {
                          navigate('/Profile');
                          toggleSideMenu();
                        }}
                      >
                        Profile
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-black">My Profile</div>
                      <button
                        onClick={() => {
                          navigate('/LogIn');
                          toggleSideMenu();
                        }}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full focus:outline-none"
              onClick={toggleSideMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8 mt-5">
          <div className="relative group">
            <a
              href="/Wishlist"
              className="bg-gray-100 text-gray-800 rounded-full p-4 flex justify-center items-center"
            >
              <FaHeart className="h-10 w-10 transition-transform duration-300 transform group-hover:scale-110 group-hover:text-[#432f84] cursor-pointer" />

              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Wishlist
              </span>
            </a>
          </div>
          <div className="relative group">
            <a
              href="/Cart"
              className="bg-gray-100 text-gray-800 rounded-full p-4 flex justify-center items-center"
            >
              <FaShoppingCart className="h-10 w-10 transition-transform duration-300 transform group-hover:scale-110 group-hover:text-[#432f84] cursor-pointer" />
              <span className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Cart
              </span>
            </a>
          </div>
          <div className="relative group">
            <a
              href="/Orders"
              className="bg-gray-100 text-gray-800 rounded-full p-4 flex justify-center items-center"
            >
              <FaClipboardList className="h-10 w-10 transition-transform duration-300 transform group-hover:scale-110 group-hover:text-[#432f84] cursor-pointer" />
              <span className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Orders
              </span>
            </a>
          </div>
        </div>
        <div className="py-4 overflow-y-auto flex-grow">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/Home"
                className="group flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <FaHome className="text-gray-600 h-6 w-6 group-hover:text-[#432f84]" />
                <span className="group-hover:scale-110 transition-transform duration-300">
                  Home
                </span>
              </a>
            </li>
            <li>
              <a
                href="/Shop"
                className="group flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <FaStore className="text-gray-600 h-6 w-6 group-hover:text-[#432f84]" />
                <span className="group-hover:scale-110 transition-transform duration-300">
                  Shop
                </span>
              </a>
            </li>
            <li>
              <a
                href="/BulkOrders"
                className="group flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <FaBox className="text-gray-600 h-6 w-6 group-hover:text-[#432f84]" />
                <span className="group-hover:scale-110 transition-transform duration-300">
                  Bulk Orders
                </span>
              </a>
            </li>
            <li>
              <a
                href="/AboutUs"
                className="group flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <FaInfoCircle className="text-gray-600 h-6 w-6 group-hover:text-[#432f84]" />
                <span className="group-hover:scale-110 transition-transform duration-300">
                  About Us
                </span>
              </a>
            </li>
            <li>
              <a
                href="/ContactUs"
                className="group flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
              >
                <FaPhone className="text-gray-600 h-6 w-6 group-hover:text-[#432f84] rotate-90" />
                <span className="group-hover:scale-110 transition-transform duration-300">
                  Contact Us
                </span>
              </a>
            </li>
          </ul>
        </div>
        {isAuthenticated ? (
          <>
            <div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                  toggleSideMenu();
                }}
                className="flex items-center w-full text-left p-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt className="text-white h-5 w-5 mr-3" />
                <span className="text-base">Logout</span>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DrawerNavigation;
