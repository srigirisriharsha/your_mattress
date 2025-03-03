import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ContactUsPage from '../../views/ContactUs/ContactUs';
import AboutUsPage from '../../views/AboutUs/AboutUs';
import HomePage from '../../views/Home/Home';
import NavBarPage from '../../views/navBar/NavBar';
import FooterPage from '../../views/footer/Footer';
import MattressesPage from '../../views/Shop/Shop';
import LogInPage from '../../views/UserLogIn/UserLogIn';
import Register from '../../views/UserRegister/UserRegister';
import Wishlist from '../../views/Wishlist/Wishlist';
import PrivateRoutes from '../../views/PrivateRoutes/PrivateRoutes';
import NotFoundPage from '../../views/NotFoundPage/NotFoundPage';
import StoreLocator from '../../views/StoreLocator/StoreLocator';
import BulkOrders from '../../views/BulkOrders/BulkOrders';
import Profile from '../../views/Profile/Profile';
import Cart from '../../views/Cart/Cart';
import { useAuth } from '../../context/MainContext';
import LoadingContainer from '../LoadingContainer/LoadingContainer';
import Product from '../../views/Products/Product';
import DrawerNavigation from '../../views/DrawerNavigation/DrawerNavigation';
import BuyNow from '../../views/BuyNow/BuyNow';
import ChangePassword from '../../views/Profile/ChangePassword';
import Orders from '../../views/orders/orders';
import OrderedProduct from '../../views/orders/orderedProduct';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const RoutesPage = () => {
  const { isAuthenticated, isLoading, sideMenuOpen, toggleSideMenu, logout } =
    useAuth(); // Correctly destructure isAuthenticated and isLoading

  if (isLoading) {
    return <LoadingContainer />; // Show loading spinner while checking authentication
  }

  return (
    // <Router>
    <>
      <DrawerNavigation
        sideMenuOpen={sideMenuOpen}
        toggleSideMenu={toggleSideMenu}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <NavBarPage />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />

        {/* Public Routes */}
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Shop" element={<MattressesPage />} />
        <Route path="/StoreLocator" element={<StoreLocator />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/BulkOrders" element={<BulkOrders />} />
        <Route path="/ContactUs" element={<ContactUsPage />} />
        <Route path="/product/:id" element={<Product />} />

        {/* Private Routes */}
        <Route
          path="/Wishlist"
          element={
            <PrivateRoutes>
              <Wishlist />
            </PrivateRoutes>
          }
        />
        <Route
          path="/buy-product-now/:productsId"
          element={
            <PrivateRoutes>
              <BuyNow />
            </PrivateRoutes>
          }
        />
        <Route
          path="/Cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/ChangePassword"
          element={
            <PrivateRoutes>
              <ChangePassword />
            </PrivateRoutes>
          }
        />
        <Route
          path="/Orders"
          element={
            <PrivateRoutes>
              <Orders />
            </PrivateRoutes>
          }
        />
        <Route
          path="/order-product/:id"
          element={
            <PrivateRoutes>
              <OrderedProduct />
            </PrivateRoutes>
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/LogIn"
          element={isAuthenticated ? <Navigate to="/Home" /> : <LogInPage />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/Home" /> : <Register />}
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterPage />

      {/* </Router> */}
    </>
  );
};

export default RoutesPage;
