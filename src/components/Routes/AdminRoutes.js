import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminOrders from '../../views/Admin/Orders/AdminOrders';
import AdminUsers from '../../views/Admin/Users/AdminUsers';
import AdminProducts from '../../views/Admin/Products/AdminProducts';
import AdminEmployees from '../../views/Admin/Employees/AdminEmployees';
import AdminChat from '../../views/Admin/Chat/AdminChat';
import AdminPrivateRoutes from '../../views/PrivateRoutes/AdminPrivateRoutes';
import AdminBulkOrders from '../../views/Admin/BulkOrders/AdminBulkOrders';
import AdminContactUs from '../../views/Admin/ContactUs/AdminContactUs';
import AdminLogin from '../../views/Admin/Login/AdminLogin';
import AdminOrderedProduct from '../../views/Admin/Orders/AdminOrderedProduct';
import AdminUserByIdPage from '../../views/Admin/Users/AdminUserByIdPage';
import AdminAddOrder from '../../views/Admin/Orders/AdminAddOrder';
import AdminContactUsDetailsCard from '../../views/Admin/ContactUs/AdminContactUsDetailsCard';
import AdminBulkOrdersDetailsCard from '../../views/Admin/BulkOrders/AdminBulkOrdersDetailsCard';
import EmployeeOrders from '../../views/Admin/Employees/EmployeeOrders';
import AdminProduct from '../../views/Admin/Orders/AdminProduct';
import AdminCart from '../../views/Admin/Orders/AdminCart';
import AdminBuyNow from '../../views/Admin/Orders/AdminBuyNow';
import AdminAddProduct from '../../views/Admin/Products/AdminAddProduct';
import AdminAddOrderProduct from '../../views/Admin/Orders/AdminAddOrderProduct';

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/customers-orders" />} />
        <Route path="/log-in" element={<AdminLogin />} />
        <Route
          path="/customers-orders"
          element={
            <AdminPrivateRoutes>
              <AdminOrders />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/order-product/:id"
          element={
            <AdminPrivateRoutes>
              <AdminOrderedProduct />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/employee-orders/:id"
          element={
            <AdminPrivateRoutes>
              <EmployeeOrders />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/products/add-product"
          element={
            <AdminPrivateRoutes>
              <AdminAddProduct />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/contact-us/:id"
          element={
            <AdminPrivateRoutes>
              <AdminContactUsDetailsCard />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/user/:id"
          element={
            <AdminPrivateRoutes>
              <AdminUserByIdPage />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/add-order"
          element={
            <AdminPrivateRoutes>
              <AdminAddOrder />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/customers-details"
          element={
            <AdminPrivateRoutes>
              <AdminUsers />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/store-products"
          element={
            <AdminPrivateRoutes>
              <AdminProducts />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/employees"
          element={
            <AdminPrivateRoutes>
              <AdminEmployees />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/user-chats"
          element={
            <AdminPrivateRoutes>
              <AdminChat />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/bulk-orders/:id"
          element={
            <AdminPrivateRoutes>
              <AdminBulkOrdersDetailsCard />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AdminPrivateRoutes>
              <AdminProduct />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/add-order-product/:id"
          element={
            <AdminPrivateRoutes>
              <AdminAddOrderProduct />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/cart/"
          element={
            <AdminPrivateRoutes>
              <AdminCart />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/buy-product-now/:productsId"
          element={
            <AdminPrivateRoutes>
              <AdminBuyNow />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/bulk-orders"
          element={
            <AdminPrivateRoutes>
              <AdminBulkOrders />
            </AdminPrivateRoutes>
          }
        />
        <Route
          path="/contact-us"
          element={
            <AdminPrivateRoutes>
              <AdminContactUs />
            </AdminPrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;
