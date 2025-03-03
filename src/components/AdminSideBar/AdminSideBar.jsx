import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import {
  UsersIcon,
  ShoppingBagIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  ArchiveIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminRoutes from '../Routes/AdminRoutes';
import logoImage from '../../assets/Images/logoImage.jpg';
import { getAdminUserDetails } from '../../services/admin/adminservice';
import { useAuth } from '../../context/MainContext';
import { FirstLetters } from '../CustomComponents/utils';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const AdminSideBar = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: '',
  };
  const location = useLocation(); // Get current location
  const [userData, setUserData] = useState(defaultValues);
  const [isMobileOrTabletFlag, setIsMobileOrTablet] = useState(false);
  const {
    isAdminAuthenticated,
    admin,
    setAdminMenuOpen,
    adminMenuOpen,
    adminLogout,
    sidebarOpen,
    setSidebarOpen,
  } = useAuth();
  const menuRef = useRef(null);
  const divRef = useRef(null);
  const isMobileOrTablet = () => {
    const screenWidth = window.innerWidth;
    setIsMobileOrTablet(screenWidth < 1024);
    return screenWidth < 1024; // Assuming 'lg' is 1024px in Tailwind
  };
  useEffect(() => {
    // Check the screen size initially
    isMobileOrTablet();

    // Update screen size on window resize
    window.addEventListener('resize', isMobileOrTablet);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', isMobileOrTablet);
    };
  }, []);
  const handleClickOutside = useCallback(
    (event) => {
      const clickedOutsideMenu =
        menuRef.current && !menuRef.current.contains(event.target);
      if (adminMenuOpen && clickedOutsideMenu) {
        setAdminMenuOpen(false);
      }
      if (divRef.current && !divRef.current.contains(event.target)) {
        // If the click is outside the div, check the screen size
        if (isMobileOrTablet()) {
          console.log('Clicked outside on a mobile or tablet screen!');
          // Your function logic here
          setSidebarOpen(false);
        }
      }
    },
    [adminMenuOpen, setAdminMenuOpen, setSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFetchUserDetails = useCallback(async () => {
    try {
      if (admin) {
        const response = await getAdminUserDetails(admin);
        if (response && response?.data) {
          if (response?.data?.success) {
            const userDetails = response?.data?.data[0];
            if (userDetails) {
              const userObj = {
                name: userDetails?.name,
                role: userDetails?.role,
              };
              setUserData(userObj);
            }
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [admin]);
  useEffect(() => {
    handleFetchUserDetails();
  }, [handleFetchUserDetails]);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };
  const menuItems =
    userData?.role == 'Admin'
      ? [
          {
            name: 'Orders',
            icon: ClipboardListIcon,
            route: '/admin/customers-orders',
          },
          { name: 'Users', icon: UsersIcon, route: '/admin/customers-details' },
          {
            name: 'Products',
            icon: ShoppingBagIcon,
            route: '/admin/store-products',
          },
          { name: 'Employees', icon: BriefcaseIcon, route: '/admin/employees' },
          // { name: 'Chats', icon: ChatAltIcon, route: '/admin/user-chats' },
          {
            name: 'Bulk Orders',
            icon: ArchiveIcon,
            route: '/admin/bulk-orders',
          },
          {
            name: 'Contact-Us',
            icon: PhoneIcon,
            route: '/admin/contact-us',
          },
        ]
      : [
          {
            name: 'Orders',
            icon: ClipboardListIcon,
            route: '/admin/customers-orders',
          },
          // { name: 'Chats', icon: ChatAltIcon, route: '/admin/user-chats' },
          {
            name: 'Bulk Orders',
            icon: ArchiveIcon,
            route: '/admin/bulk-orders',
          },
          {
            name: 'Contact-Us',
            icon: PhoneIcon,
            route: '/admin/contact-us',
          },
        ];
  // const getTitle = () => {
  //   const menu = menuItems.find((r) => r.route == location.pathname);
  //   if (menu) {
  //     return menu.name;
  //   } else {
  //     return '';
  //   }
  // };
  return (
    <>
      {/* Sidebar */}
      <div className="h-full overflow-hidden">
        <div
          ref={divRef}
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-black text-white h-full fixed transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="h-full bg-pattern-dark flex flex-col justify-between">
            <div className="p-4 h-full flex flex-col justify-between">
              {/* Sidebar Header */}
              <div className="flex justify-center items-center">
                <a
                  href="/admin"
                  className="text-sm font-semibold leading-6 cursor-pointer"
                >
                  <img
                    className="h-10 w-auto rounded-[10px] shadow-xl"
                    src={logoImage}
                    alt="logo"
                  />
                </a>
              </div>
              <br />
              {/* Sidebar Menu Items */}
              <ul className="flex-grow">
                {menuItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link to={item.route}>
                      <button
                        className={`flex items-center p-3 rounded-md text-md w-full hover:bg-gray-800 transition-colors ${
                          location.pathname === item.route ? 'bg-gray-700' : ''
                        }`}
                      >
                        {/* Icon always visible with consistent size */}
                        <item.icon
                          className={`h-6 w-6 text-white ${sidebarOpen ? 'mr-4' : 'mx-auto'}`}
                        />
                        {/* Text hidden when sidebar is collapsed */}
                        <span
                          className={`${
                            sidebarOpen ? 'block' : 'hidden'
                          } text-white transition-all`}
                        >
                          {item.name}
                        </span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Logout Button - Placed at the bottom */}
              {isAdminAuthenticated && (
                <div className="">
                  <button
                    onClick={() => {
                      adminLogout();
                      navigate('/admin');
                      toggleMenu();
                    }}
                    className="flex items-center w-full text-left p-2 bg-white text-black rounded-lg hover:bg-orange-500 transition-colors"
                  >
                    <FaSignOutAlt className="text-black h-5 w-5 mr-3" />
                    <span className="text-bold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Topbar */}
        <div
          className={`${
            sidebarOpen ? 'ml-64 backdrop-blur' : 'ml-0' // Adjusted for full width when collapsed
          } flex-1 transition-all duration-300 ease-in-out`}
        >
          <div className="h-14 bg-gray-100 shadow flex justify-between items-center px-4 fixed top-0 left-0 right-0 z-50">
            <div className="flex">
              {isAdminAuthenticated ? (
                <>
                  <button
                    onClick={toggleSidebar}
                    className="text-black-900 focus:outline-none"
                  >
                    <MenuIcon className="h-6 w-6 text-black-900" />
                  </button>
                </>
              ) : (
                <></>
              )}

              <a
                href="/admin"
                className="text-sm font-semibold leading-6 cursor-pointer ml-4"
              >
                <img
                  className="h-10 w-auto rounded-[10px] shadow-xl"
                  src={logoImage}
                  alt="logo"
                />
              </a>
            </div>
            <div>
              <div className="relative group">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    if (isAdminAuthenticated) {
                      toggleMenu();
                    } else {
                      // window.location.href = '/admin';
                    }
                  }}
                  className="text-sm font-semibold leading-6 text-black cursor-pointer"
                >
                  {isAdminAuthenticated ? (
                    <>
                      <button
                        className="w-10 h-10 bg-gray-600 rounded-full text-white text-lg"
                        title={userData.name}
                      >
                        {FirstLetters(userData.name)}
                      </button>
                    </>
                  ) : (
                    <>
                      <FaUser
                        className="h-6 w-6 transition-transform duration-300 transform hover:scale-110 hover:text-white hover:bg-white hover:rounded-full hover:p-1 cursor-pointer"
                        style={{ color: 'black' }} // Ensures black color is applied
                      />
                    </>
                  )}

                  {adminMenuOpen && isAdminAuthenticated && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg"
                    >
                      <ul className="bg-white rounded-lg shadow-lg py-2">
                        <li>
                          <button
                            onClick={() => {
                              adminLogout();
                              navigate('/admin');
                              toggleMenu();
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
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {/* <div className={`w-full min-h-full overflow-auto pt-14 bg-gray-50 `}>
            <AdminRoutes />
          </div> */}

          <div
            className={`w-full min-h-full overflow-auto pt-14 bg-gray-50 transition ${
              sidebarOpen && isMobileOrTabletFlag
                ? 'blur-sm brightness-75' // Apply blur and dimming when sidebarOpen is true on mobile/tablet
                : ''
            }`}
          >
            <AdminRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
