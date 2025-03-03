import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';
import { changePassword } from '../../services/user/userservice';
const ChangePassword = () => {
  const defaultValues = {
    password: '',
    confirmPassword: '',
  };
  const { user } = useAuth();
  const [userData, setUserData] = useState(defaultValues);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      // Check if passwords match
      if (name === 'password' || name === 'confirmPassword') {
        if (updatedUserData.password !== updatedUserData.confirmPassword) {
          setPasswordError('Confirm Password should match with given Password');
        } else {
          setPasswordError('');
        }
      }

      return updatedUserData;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError('Confirm Password should match with given Password');
      return;
    }

    const userObject = {
      userId: user,
      password: userData.password,
    };

    const resp = await changePassword(userObject);

    if (resp && resp.data) {
      if (resp.data.success) {
        navigate('/Home');
      } else {
        setError(resp.data.message || 'An error occurred.');
      }
    } else {
      setError('Failed to update the password. Please try again.');
    }
  };
  const handleCancel = () => {
    setUserData(defaultValues);
    navigate('/Home');
  };
  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-200`}
    >
      <div className="mt-[30px] mb-[30px] w-full max-w-md p-4  rounded-lg">
        <div className="bg-white rounded-lg p-8 px-4 max-w-md w-full shadow-[0_4px_6px_rgba(67,47,132,0.3)]">
          {/* Form */}
          <div className="grid grid-cols-1 divide-y">
            <h2 className="text-lg font-medium mb-6 text-center">
              Change Password
            </h2>
            <form onSubmit={handleSubmit}>
              <br />
              <div className="mb-4 relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  placeholder="Enter your Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500 mt-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500 mt-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4 relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  placeholder="Re-Enter your Password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500 mt-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500 mt-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              {/* Error Message */}
              {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

              {/* Submit Button */}
              <div className="flex justify-between gap-10">
                <button
                  type="submit"
                  disabled={
                    userData.password === '' ||
                    userData.confirmPassword === '' ||
                    userData.password !== userData.confirmPassword
                  }
                  className={`mt-4 w-full py-2 font-semibold rounded-md focus:outline-none focus:ring-2 ${
                    userData.password !== '' &&
                    userData.confirmPassword !== '' &&
                    userData.password === userData.confirmPassword
                      ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
                <button
                  onClick={handleCancel}
                  className={`mt-4 w-full py-2 font-semibold rounded-md focus:outline-none focus:ring-2 bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
