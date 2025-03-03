import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAdminUserDetails,
  getAllAdminEmployees,
  getAllOrders,
  getEmployeeAllOrders,
} from '../../../services/admin/adminservice';
import { useNavigate } from 'react-router-dom';
import { demoProducts } from '../../../components/CustomComponents/utils';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { getUserDetailsById } from '../../../services/user/userservice';
import Pagination from '../../../components/CustomComponents/Pagination';
import { useAuth } from '../../../context/MainContext';
import AdminOrderAssignToModal from './AdminOrderAssignToModal';
import { orderStatusStyles } from '../../../components/CustomComponents/Constants';

const AdminOrders = () => {
  const defaultValues = {
    name: '',
  };
  const navigate = useNavigate();
  const { setAdminCart, admin } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [deliveryDateDropdownOpen, setDeliveryDateDropdownOpen] =
    useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
  const [showModal, setShowModal] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [adminUserData, setAdminUserData] = useState(defaultValues);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);
  // Get the current items to display
  const currentItems = filteredOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const dropdownRef = useRef(null);
  const handleHoverPriceDropdown = () => {
    if (!priceDropdownOpen) {
      setPriceDropdownOpen(true);
      setDeliveryDateDropdownOpen(false);
      setCategoriesDropdownOpen(false);
    }
  };

  const handleHoverDeliveryDateDropdown = () => {
    if (!deliveryDateDropdownOpen) {
      setDeliveryDateDropdownOpen(true);
      setCategoriesDropdownOpen(false);
      setPriceDropdownOpen(false);
    }
  };

  const handleHoverCategoriesDropdown = () => {
    if (!categoriesDropdownOpen) {
      setCategoriesDropdownOpen(true);
      setDeliveryDateDropdownOpen(false);
      setPriceDropdownOpen(false);
    }
  };

  // Handle click
  const handlePriceDropdownToggle = () => {
    setPriceDropdownOpen(!priceDropdownOpen);
  };

  const handleDeliveryDateDropdownToggle = () => {
    setDeliveryDateDropdownOpen(!deliveryDateDropdownOpen);
  };

  const handleCategoriesDropdownToggle = () => {
    setCategoriesDropdownOpen(!categoriesDropdownOpen);
  };

  // Close all dropdowns when clicking outside

  useEffect(() => {
    // Handler for detecting clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMainDropdownOpen(false);
        setPriceDropdownOpen(false);
        setDeliveryDateDropdownOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch admin user details
  const handleFetchUserDetails = useCallback(async () => {
    try {
      if (admin) {
        const response = await getAdminUserDetails(admin);
        if (response?.data?.success) {
          const userDetails = response?.data?.data[0];
          if (userDetails) {
            const userObj = {
              name: userDetails?.name,
              role: userDetails?.role,
            };
            setAdminUserData(userObj);
          }
        }
      }
    } catch (error) {
      console.log('Error fetching admin user details:', error);
    }
  }, [admin]);

  // Fetch employees
  const _getAllEmployees = useCallback(async () => {
    try {
      const response = await getAllAdminEmployees();
      if (response?.data?.success) {
        const empData = response.data.data;
        if (empData?.length > 0) {
          const updatedData = empData.filter((e) => e?.role !== 'Admin');
          setEmployeesData(updatedData);
          setEmployeesLoaded(true); // Mark employees as loaded after fetch
        }
      }
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  }, []);

  // Fetch orders, only after employees are loaded
  const _getAllOrders = useCallback(async () => {
    try {
      if (!employeesLoaded || !adminUserData) return; // Don't fetch if employees or user details are not loaded

      let response;
      if (adminUserData?.role === 'Admin') {
        response = await getAllOrders();
      } else {
        response = await getEmployeeAllOrders(admin);
      }

      if (response?.data?.success) {
        const cartData = response.data.data || [];

        // Map and enrich cart data with employee and user info
        const cartDataPromises = cartData.map(async (f) => {
          const obj = demoProducts?.find((e) => e?.id === f?.product_id);
          const empobj = employeesData?.find((e) => e?.id === f?.assigned_to);
          const userResp = await getUserDetailsById(f?.user_id);

          return {
            demoProductObj: obj || {}, // Default to empty if no match
            cartDataObj: { ...f },
            userObj: userResp?.data?.data[0] || {},
            employeeObj: empobj || {},
          };
        });

        const resolvedCartData = await Promise.all(cartDataPromises);
        setOrderData(resolvedCartData);
        setFilteredOrders(resolvedCartData);
      } else {
        setOrderData([]);
        setFilteredOrders([]);
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  }, [admin, adminUserData, employeesData, employeesLoaded]);

  // Fetch admin details when the component loads
  useEffect(() => {
    handleFetchUserDetails();
  }, [handleFetchUserDetails]);

  // Fetch employees when the component loads
  useEffect(() => {
    _getAllEmployees();
  }, [_getAllEmployees]);

  // Fetch orders only after employees are loaded and user details are available
  useEffect(() => {
    if (employeesLoaded && adminUserData) {
      _getAllOrders();
    }
  }, [employeesLoaded, adminUserData, _getAllOrders]);

  const goToProductView = async (product) => {
    navigate(`/admin/order-product/${product?.demoProductObj?.id}`, {
      state: product,
    });
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedState(selectedValue);
    if (selectedValue === 'Filter By State') {
      setFilteredOrders([...orderData]);
    } else {
      // Filter orders by state
      const filteredData = orderData.filter(
        (order) => order.cartDataObj?.order_status === selectedValue
      );
      setFilteredOrders(filteredData);
    }
  };
  const handleSelectCategory = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    if (selectedValue === 'Filter By Category') {
      setFilteredOrders([...orderData]);
    } else {
      // Filter orders by state
      const filteredData = orderData.filter(
        (order) => order.cartDataObj?.category === selectedValue
      );
      setFilteredOrders(filteredData);
    }
  };
  const handleSearch = (searchTerm) => {
    const filteredData = orderData.filter((order) => {
      const productName = order.demoProductObj?.name?.toLowerCase();
      const userName = order.userObj?.user_name?.toLowerCase();
      const orderId = order.cartDataObj?.order_id?.toLowerCase();
      const quantity = order.cartDataObj?.quantity?.toString().toLowerCase();
      const orderStatus = order.cartDataObj?.order_status?.toLowerCase();
      const size = order.cartDataObj?.size?.toLowerCase();
      const price = order.cartDataObj?.category_price?.toString().toLowerCase();
      const deliveryDate = order.cartDataObj?.delivery_date?.toLowerCase();

      return (
        productName?.includes(searchTerm.toLowerCase()) ||
        userName?.includes(searchTerm.toLowerCase()) ||
        orderId?.includes(searchTerm.toLowerCase()) ||
        quantity?.includes(searchTerm.toLowerCase()) ||
        orderStatus?.includes(searchTerm.toLowerCase()) ||
        size?.includes(searchTerm.toLowerCase()) ||
        price?.includes(searchTerm.toLowerCase()) ||
        deliveryDate?.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredOrders(filteredData);
  };

  const handleSort = (sortBy) => {
    const sortedOrders = [...filteredOrders];

    // Helper function to convert "DD-MM-YYYY" to "YYYY-MM-DD"
    const convertDate = (dateStr) => {
      const [day, month, year] = dateStr.split('-');
      return new Date(`${year}-${month}-${day}`);
    };

    if (sortBy === 'price-high-low') {
      sortedOrders.sort(
        (a, b) => b.cartDataObj?.category_price - a.cartDataObj?.category_price
      );
    } else if (sortBy === 'price-low-high') {
      sortedOrders.sort(
        (a, b) => a.cartDataObj?.category_price - b.cartDataObj?.category_price
      );
    } else if (sortBy === 'Ascending') {
      sortedOrders.sort((a, b) => {
        const dateA = convertDate(a.cartDataObj?.delivery_date);
        const dateB = convertDate(b.cartDataObj?.delivery_date);

        // Check for invalid dates
        if (isNaN(dateA) || isNaN(dateB)) {
          console.warn('Invalid delivery date found');
          return 0;
        }

        return dateA - dateB; // Compare dates in ascending order
      });
    } else if (sortBy === 'Descending') {
      sortedOrders.sort((a, b) => {
        const dateA = convertDate(a.cartDataObj?.delivery_date);
        const dateB = convertDate(b.cartDataObj?.delivery_date);

        // Check for invalid dates
        if (isNaN(dateA) || isNaN(dateB)) {
          console.warn('Invalid delivery date found');
          return 0;
        }

        return dateB - dateA; // Compare dates in descending order
      });
    } else if (sortBy === 'categories-single') {
      // Sort by Single category
      sortedOrders.sort((a, b) => {
        const categoryA = a.cartDataObj?.category || '';
        const categoryB = b.cartDataObj?.category || '';
        return categoryA === 'Single' ? -1 : categoryB === 'Single' ? 1 : 0;
      });
    } else if (sortBy === 'categories-double') {
      // Sort by Double category
      sortedOrders.sort((a, b) => {
        const categoryA = a.cartDataObj?.category || '';
        const categoryB = b.cartDataObj?.category || '';
        return categoryA === 'Double' ? -1 : categoryB === 'Double' ? 1 : 0;
      });
    } else if (sortBy === 'categories-queen') {
      // Sort by Queen category
      sortedOrders.sort((a, b) => {
        const categoryA = a.cartDataObj?.category || '';
        const categoryB = b.cartDataObj?.category || '';
        return categoryA === 'Queen' ? -1 : categoryB === 'Queen' ? 1 : 0;
      });
    } else if (sortBy === 'categories-king') {
      // Sort by King category
      sortedOrders.sort((a, b) => {
        const categoryA = a.cartDataObj?.category || '';
        const categoryB = b.cartDataObj?.category || '';
        return categoryA === 'King' ? -1 : categoryB === 'King' ? 1 : 0;
      });
    }

    setFilteredOrders(sortedOrders);
  };
  const hanldeAdminAddOrder = () => {
    setAdminCart([]);
    navigate(`/admin/add-order/`);
  };

  return (
    <div className="bg-red min-h-screen w-full p-4">
      {showModal && (
        <AdminOrderAssignToModal
          showModal={showModal}
          setShowModal={setShowModal}
          employeesData={employeesData}
          selectedRow={selectedRow}
          _getAllOrders={_getAllOrders}
        />
      )}
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Orders
          </h1>
          <button
            onClick={hanldeAdminAddOrder}
            className="bg-black p-1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add Order
          </button>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-1"></div>
      </div>
      <div className=" relative flex flex-col sm:flex-row justify-between mt-2 mb-2 gap-4">
        {/* Select Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 flex-grow">
          <div className="w-[200px] whitespace-nowrap ">
            <select
              id="countries"
              value={selectedState}
              onChange={handleSelectChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Filter By State</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="w-[180px] whitespace-nowrap">
            <select
              id="countries"
              value={selectedCategory}
              onChange={handleSelectCategory}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Filter By Category</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-grow">
          <div className="w-full flex justify-end bg-white gap-2">
            <button
              onClick={_getAllEmployees}
              className="p-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 flex items-center"
            >
              Refresh
            </button>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
                required
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                id="multiLevelDropdownButton"
                data-dropdown-toggle="multi-dropdown"
                className="w-[110px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                type="button"
              >
                Sort By
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isMainDropdownOpen && (
                <div className=" z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0">
                  <ul className="py-2 text-sm text-gray-700">
                    {/* Price Dropdown */}
                    <li className="relative">
                      <button
                        id="doubleDropdownButton"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                        onClick={handlePriceDropdownToggle}
                        onMouseEnter={handleHoverPriceDropdown}
                      >
                        Price
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>

                      {/* Price Submenu */}
                      {priceDropdownOpen && (
                        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-[180px] top-0">
                          <ul className="py-2 text-sm text-gray-700">
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('price-high-low')}
                            >
                              High to Low
                            </li>
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('price-low-high')}
                            >
                              Low to High
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>

                    {/* Delivery Date Dropdown */}
                    <li className="relative">
                      <button
                        id="doubleDropdownButton"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                        onClick={handleDeliveryDateDropdownToggle}
                        onMouseEnter={handleHoverDeliveryDateDropdown}
                      >
                        Delivery Date
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>

                      {/* Delivery Date Submenu */}
                      {deliveryDateDropdownOpen && (
                        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-[180px] top-0">
                          <ul className="py-2 text-sm text-gray-700">
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('Ascending')}
                            >
                              Ascending
                            </li>
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('Descending')}
                            >
                              Descending
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>

                    {/* Categories Dropdown */}
                    <li className="relative">
                      <button
                        id="doubleDropdownButton"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                        onClick={handleCategoriesDropdownToggle}
                        onMouseEnter={handleHoverCategoriesDropdown}
                      >
                        Categories
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>

                      {/* Categories Submenu */}
                      {categoriesDropdownOpen && (
                        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-[180px] top-0">
                          <ul className="py-2 text-sm text-gray-700">
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('Single')}
                            >
                              Single
                            </li>
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('Double')}
                            >
                              Double
                            </li>
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('Queen')}
                            >
                              Queen
                            </li>
                            <li
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => handleSort('King')}
                            >
                              King
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          <div className=" overflow-y-auto rounded-lg ">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 ">
              {/* Sticky Table Header */}
              <thead className="text-xs text-white uppercase bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Order Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Ordered By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[300px] whitespace-nowrap "
                  >
                    Delivery Date
                  </th>
                  <th scope="col" className="px-6 py-3 w-[120px]">
                    Status
                  </th>

                  {adminUserData?.role === 'Admin' ? (
                    <>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[120px] whitespace-nowrap "
                      >
                        Assigned To
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[120px] whitespace-nowrap "
                      >
                        Action
                      </th>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentItems?.length > 0 ? (
                  currentItems?.map((e, i) => (
                    <tr key={i} className={`border-b `}>
                      <td
                        scope="row"
                        className="px-6 py-4  w-[300px] whitespace-nowrap "
                      >
                        <div className="relative flex inline-block gap-2">
                          {/* Show "New" sticker if the order is new */}
                          {Object.keys(e?.employeeObj)?.length === 0 && (
                            <span className=" top-0 left-0 bg-green-500 text-white text-xs font-semibold px-1 py-0.5 rounded">
                              New
                            </span>
                          )}
                          <p
                            onClick={async (ev) => {
                              ev.stopPropagation();
                              await goToProductView(e);
                            }}
                            className="text-sm text-blue-600 hover:underline cursor-pointer"
                            title={e?.cartDataObj?.order_id} // Tooltip to show full text on hover
                          >
                            {e?.cartDataObj?.order_id?.length > 15
                              ? `${e.cartDataObj.order_id.slice(0, 15)}...`
                              : e?.cartDataObj?.order_id}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                        {e?.userObj?.user_name}
                      </td>
                      <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                        {e?.demoProductObj?.name?.length > 20
                          ? `${e.demoProductObj?.name?.slice(0, 20)}...`
                          : e?.demoProductObj?.name}
                      </td>
                      <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                        {e?.cartDataObj?.quantity}
                      </td>
                      <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                        {e?.cartDataObj?.size}
                      </td>
                      <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                        {e?.cartDataObj?.category_price}
                      </td>
                      <td className="px-6 py-4  w-[300px] whitespace-nowrap ">
                        {e?.cartDataObj?.delivery_date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-40 text-center">
                          <p
                            className={`text-sm font-semibold border rounded-lg p-1 ${
                              orderStatusStyles[e?.cartDataObj?.order_status] ||
                              ''
                            }`}
                          >
                            {e.cartDataObj.order_status}
                          </p>
                        </div>
                      </td>

                      {adminUserData?.role === 'Admin' ? (
                        <>
                          <td className="px-6 py-4  w-[300px] whitespace-nowrap ">
                            {e?.employeeObj?.name}
                          </td>
                          <td className="px-6 py-4 w-[50px] whitespace-nowrap ">
                            <FaEdit
                              className="text-blue-600 cursor-pointer"
                              onClick={() => {
                                setSelectedRow(e);
                                setShowModal(true);
                              }}
                            />
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminOrders);
