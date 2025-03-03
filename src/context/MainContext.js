import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkValidUser } from '../services/login/loginServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkValidAdminUser } from '../services/admin/adminservice';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [adminCart, setAdminCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const userId = JSON.parse(token);
    if (userId && userId?.id) {
      const isValid = await checkValidUser(userId?.id);
      setIsAuthenticated(isValid);
      setUser(userId?.id);
    } else {
      setIsAuthenticated(false);
    }
  };
  const checkAdminAuthStatus = async () => {
    const token = localStorage.getItem('admin');
    if (!token) {
      setIsAdminAuthenticated(false);
      setSidebarOpen(false);
      return;
    }
    const adminId = JSON.parse(token);
    if (adminId && adminId?.id) {
      const isValid = await checkValidAdminUser(adminId?.id);
      setIsAdminAuthenticated(isValid);
      setAdmin(adminId?.id);
      setSidebarOpen(true);
    } else {
      setIsAdminAuthenticated(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    checkAuthStatus();
    checkAdminAuthStatus();
    setIsLoading(false);
  }, []);
  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem('access');
    setUser(null);
    setIsAuthenticated(false);
    setMenuOpen(false);
    // navigate('/'); // Navigate after logout
    toast.success('Logout successful!', {
      position: 'top-right', // Use string instead of toast.POSITION
      autoClose: 500,
    });
    setShowToast(true);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const adminLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
    setIsAdminAuthenticated(false);
    setAdminMenuOpen(false);
    setSidebarOpen(false);
    // navigate('/'); // Navigate after logout
    toast.success('Logout successful!', {
      position: 'top-right', // Use string instead of toast.POSITION
      autoClose: 500,
    });
    setShowToast(true);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const values = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    logout,
    isLoading,
    setIsLoading,
    setUser,
    menuOpen,
    setMenuOpen,
    sideMenuOpen,
    setSideMenuOpen,
    toggleSideMenu,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    admin,
    setAdmin,
    adminMenuOpen,
    setAdminMenuOpen,
    adminLogout,
    adminCart,
    setAdminCart,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
      {showToast && (
        <div
          id="toast-success"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">Logout successful.</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
