import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/admin/adminservice';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/CustomComponents/Pagination';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Get the current items to display
  const currentItems = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    _getAllUsers();
  }, []);

  const _getAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        if (response.data.success) {
          setuserData(response.data.data || []);
          setFilteredData(response.data.data || []);
        } else {
          setuserData([]);
          setFilteredData([]);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Filtered Users based on the search term
    const filteredUsersData = userData.filter((user) => {
      const userName = user.user_name?.toLowerCase();
      const user_email = user.user_email?.toLowerCase();
      const user_mobile = user.user_mobile?.toString().toLowerCase(); // Convert to string
      const alternate_mobile = user.alternate_mobile?.toLowerCase();

      return (
        userName?.includes(searchTerm.toLowerCase()) ||
        user_email?.includes(searchTerm.toLowerCase()) ||
        user_mobile?.includes(searchTerm.toLowerCase()) ||
        alternate_mobile?.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filteredUsersData);
  };
  const goToUserView = async (user) => {
    navigate(`/admin/user/${user?.user_id}`, {
      state: user,
    });
  };

  return (
    <div className=" min-h-screen w-full p-4">
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Users
          </h1>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-1"></div>
      </div>

      <div className="w-full flex justify-end  m-2 bg-white gap-2 pr-2 pt-1">
        <div>
          <button
            onClick={_getAllUsers}
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
              onChange={handleSearchChange} // Handle search input change
              required
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          <div className="overflow-y-auto rounded-lg">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
              {/* Sticky Table Header */}
              <thead className="text-xs text-white uppercase bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  w-[300px] whitespace-nowrap "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  w-[300px] whitespace-nowrap "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  w-[300px] whitespace-nowrap "
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  w-[300px] whitespace-nowrap "
                  >
                    Alternate Mobile Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.length > 0 ? (
                  currentItems?.map((e, i) => (
                    <tr key={i} className="bg-white buser-b">
                      <th scope="row" className="px-6 py-4 whitespace-nowrap ">
                        {i + 1}
                      </th>

                      <td
                        // className="px-6 py-4  w-[300px] whitespace-nowrap "
                        onClick={async (ev) => {
                          ev.stopPropagation();
                          await goToUserView(e);
                        }}
                        className="text-sm text-blue-600 hover:underline cursor-pointer px-6 py-4  w-[300px] whitespace-nowrap "
                        title={e?.cartDataObj?.order_id}
                      >
                        {e?.user_name}
                      </td>
                      <td className="px-6 py-4  w-[300px] whitespace-nowrap">
                        {e?.user_email}
                      </td>
                      <td className="px-6 py-4  w-[300px] whitespace-nowrap ">
                        {e?.user_mobile}
                      </td>
                      <td className="px-6 py-4  w-[300px] whitespace-nowrap ">
                        {e?.alternate_mobile}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Users found
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

export default AdminUsers;
