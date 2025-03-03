import { useState } from 'react';
import { updateAssigntoForOrder } from '../../../services/admin/adminservice';

const AdminOrderAssignToModal = ({
  showModal,
  setShowModal,
  employeesData,
  selectedRow,
  _getAllOrders,
}) => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  // const filteredEmployees = employeesData.filter((employee) =>
  //   employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const onSubmit = async () => {
    const values = {
      id: selectedRow?.cartDataObj?.id,
      assignedTo: selectedValue,
    };
    const resps = await updateAssigntoForOrder(values);
    if (resps && resps?.data) {
      if (resps?.data?.success) {
        setShowModal(false);
        _getAllOrders();
      }
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">
                Select Employee To Assign
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="relative w-full sm:w-auto">
                {/* <div className="relative w-full sm:w-auto mb-4">
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                </div> */}
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value="">Select an employee</option>
                  {employeesData.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t gap-4">
              <button
                className="px-4 py-2 text-black border border-black rounded-lg hover:bg-blue-600 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-blue-600"
                onClick={onSubmit}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminOrderAssignToModal;
