import React, { useCallback, useEffect, useState } from 'react';
import {
  addEmployeeService,
  getAllAdminEmployees,
} from '../../../services/admin/adminservice';
import { useAuth } from '../../../context/MainContext';
import { limitedText } from '../../../components/CustomComponents/utils';
import { FaPlus } from 'react-icons/fa';
import Pagination from '../../../components/CustomComponents/Pagination';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { UserAddIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const AdminEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [employeesData, setEmployeesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const totalPages = Math.ceil(employeesData?.length / itemsPerPage);
  const { admin } = useAuth();
  const [showPasswords, setShowPasswords] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [addEmpObject, setAddEmpObject] = useState({
    name: '',
    userId: '',
    password: '',
  });
  const navigate = useNavigate();

  const togglePassword = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const _getAllEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllAdminEmployees();
      if (response && response?.data?.success) {
        const empData = response?.data?.data;
        if (empData && empData?.length > 0) {
          const updatedData = empData?.filter(
            (r) => Number(r.id) != Number(admin)
          );
          setEmployeesData(updatedData);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, [admin]);
  useEffect(() => {
    _getAllEmployees();
  }, [_getAllEmployees]);
  const handleEmpModal = () => {
    setShowModal(true);
    setError('');
    setAddEmpObject({
      name: '',
      userId: '',
      password: '',
    });
  };
  const currentItems = employeesData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addEmployeeService(
        addEmpObject.name,
        addEmpObject.userId,
        addEmpObject.password
      );
      if (response && response?.data?.success) {
        await _getAllEmployees();
        setShowModal(false);
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.log('err', error);
      setShowModal(false);
    }
  };
  const handleEmployeeOrders = (user) => {
    try {
      navigate(`/admin/employee-orders/${user?.id}`);
    } catch (error) {
      console.log('err', error);
    }
  };
  return (
    <div>
      <div className="p-5 h-[100vh]">
        <div className="">
          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="flex justify-between items-center">
              <h1
                className="text-3xl md:text-3xl"
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
              >
                Employees Corner
              </h1>
              <div>
                <button
                  onClick={() => handleEmpModal()}
                  className="flex items-center justify-center gap-2 bg-black text-white p-2 rounded-xl hover:bg-gray-700"
                >
                  <FaPlus />
                  Add Employee
                </button>
              </div>
            </div>
            <div className="w-full h-[2px] bg-[#1d4ed8] mt-1"></div>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            </div>
          ) : (
            <div className="relative mt-4">
              {/* Scrollable Table Container */}
              <div className="overflow-x-auto">
                <div className="overflow-y-auto rounded-lg">
                  <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                    {/* Sticky Table Header */}
                    <thead className="text-xs text-white uppercase bg-gray-700 sticky top-0 z-10">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 w-[30px] whitespace-nowrap "
                        >
                          Sno
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-[300px] whitespace-nowrap  "
                        >
                          user Id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-[300px] whitespace-nowrap  "
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-[300px] whitespace-nowrap  "
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-[180px] whitespace-nowrap "
                        >
                          Password
                        </th>
                      </tr>
                    </thead>
                    {/* Scrollable Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems?.length > 0 ? (
                        currentItems?.map((e, i) => (
                          <tr key={i} className="bg-white border-b">
                            <td
                              className="px-6 py-4 w-[30px] whitespace-nowrap  "
                              title={i}
                            >
                              {limitedText(i + 1)}
                            </td>
                            <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                              <p
                                onClick={() => handleEmployeeOrders(e)}
                                className="text-sm text-blue-600 hover:underline cursor-pointer"
                                title={e?.userid}
                              >
                                {limitedText(e?.userid)}
                              </p>
                            </td>

                            <td
                              className="px-6 py-4 w-[300px] whitespace-nowrap  "
                              title={e?.name}
                            >
                              {limitedText(e?.name)}
                            </td>
                            <td className="px-6 py-4 w-[300px] whitespace-nowrap  ">
                              {e?.role}
                            </td>
                            <td className="px-6 py-4 w-[180px] whitespace-nowrap">
                              {showPasswords[i] ? e?.password : '••••••••'}
                              <button
                                onClick={() => togglePassword(i)}
                                className="ml-2"
                              >
                                {showPasswords[i] ? (
                                  <AiOutlineEyeInvisible />
                                ) : (
                                  <AiOutlineEye />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
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
          )}
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[90%] md:w-[400px] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex items-center">
                    <UserAddIcon className="h-6 w-6 items-center" />
                    <h3 className="text-xl font-semibold ml-1">Add Employee</h3>
                  </div>
                  <button
                    className="p-1 ml-auto  border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <p className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </p>
                  </button>
                </div>
                <form onSubmit={(e) => handleAddEmployeeSubmit(e)}>
                  {/*body*/}
                  <div className="relative p-3 flex-auto">
                    {/* <p className="my-4 text-blueGray-500 text-lg leading-ured">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
                    <div className="mt-1">
                      <label className="font-semibold ">
                        User Id <span className="text-red-300">{'*'}</span>
                      </label>
                      <input
                        className="border w-full mt-2 h-[30px] p-2"
                        value={addEmpObject?.userId}
                        onChange={(e) =>
                          setAddEmpObject({
                            ...addEmpObject,
                            userId: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mt-1">
                      <label className="font-semibold ">
                        Employee Name{' '}
                        <span className="text-red-300">{'*'}</span>
                      </label>
                      <input
                        value={addEmpObject?.name}
                        onChange={(e) =>
                          setAddEmpObject({
                            ...addEmpObject,
                            name: e.target.value,
                          })
                        }
                        className="border w-full mt-2 h-[30px] p-2"
                        required
                      />
                    </div>
                    <div className="mt-1">
                      <label className="font-semibold ">
                        Password <span className="text-red-300">{'*'}</span>
                      </label>
                      <input
                        value={addEmpObject?.password}
                        onChange={(e) =>
                          setAddEmpObject({
                            ...addEmpObject,
                            password: e.target.value,
                          })
                        }
                        className="border w-full mt-2 h-[30px] p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-red-600">{error}</p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default AdminEmployees;
