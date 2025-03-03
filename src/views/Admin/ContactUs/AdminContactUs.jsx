import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAdminUserDetails,
  getAllAdminEmployees,
  getAllContactus,
  getEmployeeAllContactus,
} from '../../../services/admin/adminservice';
import { useNavigate } from 'react-router-dom';
import { limitedText } from '../../../components/CustomComponents/utils';
import Pagination from '../../../components/CustomComponents/Pagination';
import { useAuth } from '../../../context/MainContext';

const AdminContactUs = () => {
  const defaultValues = {
    name: '',
  };
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [contactusData, setContactusData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [deliveryDateDropdownOpen, setDeliveryDateDropdownOpen] =
    useState(false);
  const [filteredData, setFilteredOrders] = useState(contactusData);
  const [selectedState, setSelectedState] = useState('');
  const [adminUserData, setAdminUserData] = useState(defaultValues);
  const [employeesData, setEmployeesData] = useState([]);
  const [employeesLoaded, setEmployeesLoaded] = useState(false); // Track when employees are loaded

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Get the current items to display
  const currentItems = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const dropdownRef = useRef(null);

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
  const handleFetchUserDetails = useCallback(async () => {
    try {
      if (admin) {
        const response = await getAdminUserDetails(admin);
        if (response && response?.data?.success) {
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
      console.log('Error fetching user details:', error);
    }
  }, [admin]);

  const _getAllEmployees = useCallback(async () => {
    try {
      const response = await getAllAdminEmployees();
      if (response && response?.data?.success) {
        const empData = response?.data?.data;
        if (empData && empData?.length > 0) {
          // const updatedData = empData?.filter((e) => e?.role !== 'Admin');
          console.log('Fetched Employees:', empData);
          setEmployeesData(empData);
          setEmployeesLoaded(true); // Mark employees as loaded after fetch completes
        }
      }
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  }, []);
  const _getAllContactus = useCallback(async () => {
    try {
      if (employeesLoaded && employeesData?.length > 0) {
        let response;
        if (adminUserData?.role === 'Admin') {
          response = await getAllContactus();
        } else {
          response = await getEmployeeAllContactus(admin);
        }

        if (response?.data?.success) {
          let cartData = response?.data?.data || [];
          const cartDataPromises = cartData.map(async (f) => {
            const empobj = employeesData?.find(
              (e) => e?.id === Number(f?.updated_by)
            );
            return {
              tableDataObj: { ...f },
              employeeObj: { ...empobj },
            };
          });

          const resolvedCartData = await Promise.all(cartDataPromises);
          console.log('Resolved Contact Data:', resolvedCartData);
          setContactusData(resolvedCartData || []);
          setFilteredOrders(resolvedCartData || []);
        } else {
          setContactusData([]);
          setFilteredOrders([]);
        }
      }
    } catch (error) {
      console.log('Error fetching contact us data:', error);
    }
  }, [admin, adminUserData, employeesLoaded, employeesData]);

  // First effect for fetching user details
  useEffect(() => {
    handleFetchUserDetails();
  }, [handleFetchUserDetails]);

  // Fetch employees first, then fetch contact data when employees are loaded
  useEffect(() => {
    (async () => {
      await _getAllEmployees();
    })();
  }, [_getAllEmployees]);

  // Fetch contact data after employees are loaded
  useEffect(() => {
    if (employeesLoaded) {
      _getAllContactus(); // Only fetch contact data when employees are fully loaded
    }
  }, [employeesLoaded, _getAllContactus]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedState(selectedValue);
    if (selectedValue === 'Filter By State') {
      setFilteredOrders([...contactusData]);
    } else {
      // Filter orders by state
      const filteredData = contactusData.filter(
        (order) => order.status === selectedValue
      );
      setFilteredOrders(filteredData);
    }
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredData = contactusData.filter((user) => {
      const userName = user.user_name?.toLowerCase() || '';
      const user_email = user.user_email?.toLowerCase() || '';
      const user_mobile =
        user.user_mobile_number?.toString().toLowerCase() || '';
      const user_message = user.user_message?.toLowerCase() || '';
      const status = user.status?.toLowerCase() || '';

      return (
        userName.includes(searchTerm.toLowerCase()) ||
        user_email.includes(searchTerm.toLowerCase()) ||
        user_mobile.includes(searchTerm.toLowerCase()) ||
        user_message.includes(searchTerm.toLowerCase()) ||
        status.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredOrders(filteredData);
  };

  const handleSort = (sortBy) => {
    const sortedOrders = [...filteredData];

    // Helper function to convert "DD-MM-YYYY" to "YYYY-MM-DD"
    const convertDate = (dateStr) => {
      const [day, month, year] = dateStr.split('-');
      return new Date(`${year}-${month}-${day}`);
    };

    // Sort based on selected criteria
    if (sortBy === 'status-open-closed') {
      sortedOrders.sort((a, b) => {
        const statusA = a.status ? a.status.toLowerCase() : '';
        const statusB = b.status ? b.status.toLowerCase() : '';
        return statusA === 'open' ? -1 : statusB === 'open' ? 1 : 0;
      });
    } else if (sortBy === 'status-closed-open') {
      sortedOrders.sort((a, b) => {
        const statusA = a.status ? a.status.toLowerCase() : '';
        const statusB = b.status ? b.status.toLowerCase() : '';
        return statusA === 'closed' ? -1 : statusB === 'closed' ? 1 : 0;
      });
    } else if (sortBy === 'Ascending') {
      // Sort by created_date in ascending order
      sortedOrders.sort((a, b) => {
        const dateA = convertDate(a.created_date);
        const dateB = convertDate(b.created_date);
        return dateA - dateB;
      });
    } else if (sortBy === 'Descending') {
      // Sort by created_date in descending order
      sortedOrders.sort((a, b) => {
        const dateA = convertDate(a.created_date);
        const dateB = convertDate(b.created_date);
        return dateB - dateA;
      });
    } else if (sortBy.startsWith('categories-')) {
      const categoryType = sortBy.split('-')[1];
      sortedOrders.sort((a, b) => {
        const categoryA = a.tableDataObj?.category || '';
        const categoryB = b.tableDataObj?.category || '';
        return categoryA === categoryType
          ? -1
          : categoryB === categoryType
            ? 1
            : 0;
      });
    }

    setFilteredOrders(sortedOrders);
  };

  const goToProductView = async (user) => {
    navigate(`/admin/contact-us/${user?.tableDataObj?.id}`, {
      state: user?.tableDataObj,
    });
  };
  // Handle click
  const handlePriceDropdownToggle = () => {
    setPriceDropdownOpen(!priceDropdownOpen);
  };

  const handleDeliveryDateDropdownToggle = () => {
    setDeliveryDateDropdownOpen(!deliveryDateDropdownOpen);
  };
  const handleHoverPriceDropdown = () => {
    if (!priceDropdownOpen) {
      setPriceDropdownOpen(true);
      setDeliveryDateDropdownOpen(false);
    }
  };

  const handleHoverDeliveryDateDropdown = () => {
    if (!deliveryDateDropdownOpen) {
      setDeliveryDateDropdownOpen(true);
      setPriceDropdownOpen(false);
    }
  };

  return (
    <div className="m-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-2 mb-2">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Contact Us
          </h1>
        </div>
        <div className="w-full h-[2px] bg-[#1d4ed8] mt-1"></div>
      </div>
      {contactusData?.length > 0 ? (
        <>
          <div className=" relative flex flex-col sm:flex-row justify-between  mb-2  gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2   flex-grow">
              <div className="w-[150px]">
                <select
                  id="countries"
                  value={selectedState}
                  onChange={handleSelectChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option selected>Filter By State</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-grow">
              <div className="w-full flex justify-end bg-white gap-2">
                <div>
                  <button
                    onClick={() => {
                      _getAllEmployees();
                      _getAllContactus();
                    }}
                    className="p-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 flex items-center"
                  >
                    Refresh
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    Search
                  </label>
                  <div className="relative ">
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
                      className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" // Reduced padding
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch} // Handle search input change
                      required
                    />
                  </div>
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
                    <div
                      className=" z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0"
                      id="multi-dropdown"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        {/* Price Dropdown */}
                        <li className="relative">
                          <button
                            id="doubleDropdownButton"
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                            onClick={handlePriceDropdownToggle}
                            onMouseEnter={handleHoverPriceDropdown}
                          >
                            Status
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
                                  onClick={() =>
                                    handleSort('status-open-closed')
                                  }
                                >
                                  Open to Closed
                                </li>
                                <li
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() =>
                                    handleSort('status-closed-open')
                                  }
                                >
                                  Closed to Open
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
                            Created Date
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
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div>
        <div className="relative">
          {/* Scrollable Table Container */}
          <div className="overflow-x-auto">
            <div className=" overflow-y-auto rounded-lg">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                {/* Table Header */}
                <thead className="text-xs text-white uppercase bg-gray-700 sticky top-0 z-10">
                  <tr>
                    {/* Your table header cells */}
                    <th
                      scope="col"
                      className="px-6 py-3 w-[300px] whitespace-nowrap "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[300px] whitespace-nowrap "
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[300px] whitespace-nowrap "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[300px] whitespace-nowrap "
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[300px] whitespace-nowrap "
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[120px] whitespace-nowrap "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-[120px] whitespace-nowrap "
                    >
                      Updated By
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems?.length > 0 ? (
                    currentItems.map((e, i) => (
                      <tr key={i} className="bg-white border-b">
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
                              title={e?.tableDataObj?.user_name} // Tooltip to show full text on hover
                            >
                              {e?.tableDataObj?.user_name?.length > 15
                                ? `${e?.tableDataObj?.user_name.slice(0, 15)}...`
                                : e?.tableDataObj?.user_name}
                            </p>
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 w-[300px] whitespace-nowrap "
                          title={e?.tableDataObj?.user_message}
                        >
                          {limitedText(e?.tableDataObj?.user_message)}
                        </td>
                        <td
                          className="px-6 py-4 w-[300px] whitespace-nowrap "
                          title={e?.tableDataObj?.user_email}
                        >
                          {limitedText(e?.tableDataObj?.user_email)}
                        </td>
                        <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                          {e?.tableDataObj?.user_mobile_number}
                        </td>
                        <td className="px-6 py-4 w-[180px] whitespace-nowrap ">
                          {e?.tableDataObj?.created_date}
                        </td>
                        <td className="px-6 py-4 w-[120px] whitespace-nowrap ">
                          <span
                            className={`px-2 py-1 font-semibold rounded-lg text-center ${e?.tableDataObj?.status === 'Open' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}
                          >
                            {e?.tableDataObj?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4  w-[300px] whitespace-nowrap ">
                          {e?.employeeObj?.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactUs;
