import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { limitedText } from '../../../components/CustomComponents/utils';
import Pagination from '../../../components/CustomComponents/Pagination';
import { getAllProducts } from '../../../services/admin/adminservice';

const AdminProducts = () => {
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const totalPages = Math.ceil(productsData?.length / itemsPerPage);
  const navigate = useNavigate();
  const hanldeAdminAddProduct = () => {
    navigate('/admin/products/add-product');
  };
  const _getAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      if (response && response?.data?.success) {
        setProductsData(response?.data?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    _getAllProducts();
  }, [_getAllProducts]);
  return (
    <div className="bg-red min-h-screen w-full p-4">
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Products
          </h1>
          <button
            onClick={hanldeAdminAddProduct}
            className="bg-black p-1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add Product
          </button>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-1"></div>
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
                        className="px-6 py-3 w-[250px] whitespace-nowrap  "
                      >
                        Product Id
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
                        Actual Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[180px] whitespace-nowrap "
                      >
                        Discount Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[180px] whitespace-nowrap "
                      >
                        Product Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[200px] whitespace-nowrap "
                      >
                        type
                      </th>
                    </tr>
                  </thead>
                  {/* Scrollable Table Body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsData?.length > 0 ? (
                      productsData?.map((e, i) => (
                        <tr key={i} className="bg-white border-b">
                          <td
                            className="px-6 py-4 w-[30px] whitespace-nowrap  "
                            title={i}
                          >
                            {limitedText(i + 1)}
                          </td>
                          <td className="px-6 py-4 w-[300px] whitespace-nowrap ">
                            <p
                              // onClick={() => handleEmployeeOrders(e)}
                              className="text-sm text-blue-600 hover:underline cursor-pointer"
                              title={e?.product_id}
                            >
                              {limitedText(e?.product_id)}
                            </p>
                          </td>

                          <td
                            className="px-6 py-4 w-[300px] whitespace-nowrap  "
                            title={e?.name}
                          >
                            {limitedText(e?.product_name)}
                          </td>
                          <td className="px-6 py-4 w-[300px] whitespace-nowrap  ">
                            {e?.actual_price}
                          </td>
                          <td className="px-6 py-4 w-[300px] whitespace-nowrap  ">
                            {e?.discount_price}
                          </td>
                          <td className="px-6 py-4 w-[300px] whitespace-nowrap  ">
                            {limitedText(
                              e?.product_description
                                ? e?.product_description
                                : ''
                            )}
                          </td>
                          <td className="px-6 py-4 w-[300px] whitespace-nowrap  ">
                            {e?.type}
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
  );
};

export default AdminProducts;
