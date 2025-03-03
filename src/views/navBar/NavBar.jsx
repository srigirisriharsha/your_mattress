import React, { useEffect, useCallback, useState, useRef } from 'react';
import logoImage from '../../assets/Images/logoImage.jpg';
import { useAuth } from '../../context/MainContext';
import './NavBarPage.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';
import { FirstLetters } from '../../components/CustomComponents/utils';
import { getUserDetailsById } from '../../services/user/userservice';
import {
  FaUser,
  FaClipboardList,
  FaKey,
  FaSignOutAlt,
  FaShoppingCart,
  FaHeart,
  FaBars,
} from 'react-icons/fa';

const NavBar = () => {
  const defaultValues = {
    name: '',
  };
  const {
    logout,
    isAuthenticated,
    menuOpen,
    setMenuOpen,
    toggleSideMenu,
    sideMenuOpen,
    setSideMenuOpen,
    user,
  } = useAuth();
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
  const location = useLocation();
  // To reference the menu div
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuRef = useRef(null);
  const sideMenuRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      const clickedOutsideMenu =
        menuRef.current && !menuRef.current.contains(event.target);
      if (menuOpen && clickedOutsideMenu) {
        setMenuOpen(false);
      }
      const clickedOutsideSideMenu =
        sideMenuRef.current && !sideMenuRef.current.contains(event.target);

      if (sideMenuOpen && clickedOutsideSideMenu) {
        setSideMenuOpen(false); // Close the side menu if it is open and clicked outside
      }
    },
    [menuOpen, sideMenuOpen, setSideMenuOpen, setMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const links = [
    { name: 'Home', href: '/Home' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Bulk Orders', href: '/BulkOrders' },
    { name: 'About us', href: '/AboutUs' },
    { name: 'Contact Us', href: '/ContactUs' },
  ];

  return (
    <div className="scrollbar">
      <header className="backdrop-blur-lg fixed w-full top-0 left-0 z-20 shadow-lg ">
        {/* <NavBarMessage /> */}
        <nav
          className="flex items-center justify-between p-5 lg:px-10 w-full bg-opacity-50 backdrop-blur-sm bg-gradient-to-r"
          aria-label="Global"
        >
          <div className="flex items-center space-x-4">
            {/* Burger Menu Icon */}
            <div className="relative group">
              <a
                onClick={toggleSideMenu}
                className="text-sm font-semibold leading-6 cursor-pointer"
              >
                <FaBars className="h-6 w-6 transition-transform duration-300 transform hover:scale-110 hover:text-[#432f84] hover:bg-white hover:rounded-full hover:p-1 cursor-pointer" />
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Menu
                </span>
              </a>
            </div>
            <div ref={sideMenuRef}>
              <DrawerNavigation
                sideMenuOpen={sideMenuOpen}
                toggleSideMenu={toggleSideMenu}
                isAuthenticated={isAuthenticated}
                logout={logout}
              />
            </div>
            <a
              href="/"
              className="text-sm font-semibold leading-6 cursor-pointer"
            >
              <img
                className="h-10 w-auto rounded-[10px]"
                src={logoImage}
                alt="logo"
              />
            </a>
            {/* <div className="relative flex-grow hidden lg:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMagnifyingGlass className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search Mattresses"
                className="rounded-lg p-2 pl-10 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-72 sm:text-sm"
              />
            </div> */}
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-transform duration-1000 transform hover:scale-110 font-semibold
            ${location.pathname === link.href ? 'bg-blue-900 text-white rounded-lg px-2 py-1' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <a
                href="/Wishlist"
                className="text-sm font-semibold leading-6 text-white cursor-pointer"
              >
                <FaHeart className="text-gray-700 h-6 w-6 transition-transform duration-300 transform hover:scale-110 hover:text-[#432f84] hover:bg-gray-200 hover:rounded-full hover:p-1 cursor-pointer" />
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Wishlist
                </span>
              </a>
            </div>
            <div className="relative group">
              <a
                href="/Cart"
                className="text-sm font-semibold leading-6 text-white cursor-pointer"
              >
                <FaShoppingCart className="text-gray-700 h-6 w-6 transition-transform duration-300 transform hover:scale-110 hover:text-[#432f84] hover:bg-gray-200 hover:rounded-full hover:p-1 cursor-pointer" />
                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cart
                </span>
              </a>
            </div>
            <div className="relative group">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (isAuthenticated) {
                    toggleMenu();
                  } else {
                    window.location.href = '/Profile';
                  }
                }}
                className="text-sm font-semibold leading-6 text-white cursor-pointer"
              >
                {isAuthenticated ? (
                  <>
                    <button
                      className="w-10 h-10 bg-white rounded-full text-[#ee4447] text-lg border border-gray-500"
                      title={userData.name}
                    >
                      {FirstLetters(userData.name)}
                    </button>
                  </>
                ) : (
                  <>
                    <FaUser className="text-gray-700 h-6 w-6 transition-transform duration-300 transform hover:scale-110 hover:text-[#432f84] hover:bg-gray-200 hover:rounded-full hover:p-1 cursor-pointer" />
                  </>
                )}

                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </a>
              {menuOpen && isAuthenticated && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <ul className="bg-white rounded-lg shadow-lg py-2">
                    <li>
                      <a
                        href="/Profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200"
                      >
                        <FaUser className="text-gray-600 h-5 w-5 mr-3" />
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/Orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200"
                      >
                        <FaClipboardList className="text-gray-600 h-5 w-5 mr-3" />
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="/ChangePassword"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200"
                      >
                        <FaKey className="text-gray-600 h-5 w-5 mr-3" />
                        Change Password
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200"
                      >
                        <FaSignOutAlt className="text-gray-600 h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Add padding to the top of the main content to account for the fixed header */}
      <main className="pt-[85px]">{/* Your main content goes here */}</main>
    </div>
  );
};

export default NavBar;
