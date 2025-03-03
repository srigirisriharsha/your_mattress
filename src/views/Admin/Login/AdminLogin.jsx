import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/MainContext';
import { adminSignIn } from '../../../services/admin/adminservice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { companyName } from '../../../components/CustomComponents/Constants';

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const defaultValues = {
    userId: '',
    password: '',
  };
  const {
    setIsLoading,
    setIsAuthenticated,
    setUser,
    setSideMenuOpen,
    setSidebarOpen,
  } = useAuth();
  const [error, setError] = useState('');

  const [userData, setUserData] = useState(defaultValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const from =
    location.state?.from?.pathname === '/admin/log-in'
      ? location.state?.from?.pathname
      : '/admin';
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserData({ ...userData, [inputName]: inputValue });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setSideMenuOpen(false);
      setIsSubmitButtonLoading(true);
      const response = await adminSignIn(userData.userId, userData.password);
      if (response && response?.data) {
        if (response?.data?.success) {
          const data = response?.data?.data;
          const userString = JSON.stringify({ id: data[0].id });
          localStorage.setItem('admin', userString);
          navigate(from);
          setError('');
          setUser(data[0].user_id);
          setSidebarOpen(true);
          setIsAuthenticated(true);
          setIsLoading(false);
          setIsSubmitButtonLoading(false);
        } else {
          setError(response.data.message);
          setIsLoading(false);
          setIsSubmitButtonLoading(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div
        className={`flex justify-center items-center min-h-screen bg-gray-200`}
      >
        <div className="bg-white rounded-lg p-8 px-4 max-w-md w-full shadow-[0_4px_6px_rgba(67,47,132,0.3)]">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <h1 className="text-2xl font-semibold">{companyName}</h1>
          </div>
          <div className="grid grid-cols-1 divide-y">
            <h2 className="text-lg font-medium my-4 text-center">Log In</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                  User Id
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your User Id"
                  name="userId"
                  value={userData.userId}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-500 mt-7" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-500 mt-7" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center"></div>
              </div>
              {error && <p className="text-sred-500 mt-2">{error}</p>}
              <button
                type="submit"
                className="mt-2 w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-purple-700"
              >
                {isSubmitButtonLoading ? 'Loging' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
