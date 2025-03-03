import React, { useState } from 'react';
import { companyName } from '../../components/CustomComponents/Constants';
import indianFlag from '../../assets/Images/indianFlag.png';
import { registerUser } from '../../services/login/loginServices';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const defaultValues = {
    name: '',
    password: '',
    checkbox: false,
    mobileNumber: '',
    email: '',
    address: '',
  };
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
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: checked };

      return updatedUserData;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userData.name) {
      setError('Please fill in the email field.');
      return;
    }
    if (userData.password != userData.confirmPassword) {
      setError('Confirm Password should match with given Password');
      return;
    }
    const userObject = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      address: '',
      mobile: userData.mobileNumber,
    };
    const resp = await registerUser(userObject);
    if (resp && resp?.data) {
      if (resp?.data?.success) {
        navigate('/LogIn');
      }
    }
  };
  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-200`}
    >
      <div className="mt-[30px] mb-[30px] w-full max-w-md p-4  rounded-lg">
        <div className="bg-white rounded-lg p-8 px-4 max-w-md w-full shadow-[0_4px_6px_rgba(67,47,132,0.3)]">
          {/* Header */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <h1 className="text-2xl font-semibold">{companyName}</h1>
            </a>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 divide-y">
            <h2 className="text-lg font-medium mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleRegister}>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Mobile Number Input */}
              <div className="mb-4">
                <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="flex items-center">
                  <button
                    id="dropdown-phone-button"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    type="button"
                  >
                    <img
                      src={indianFlag} // Indian flag image URL
                      alt="India Flag"
                      className="h-4 w-4 me-2"
                    />
                    +91
                  </button>
                  <label
                    htmlFor="phone-input"
                    className="mb-2 text-sm font-medium text-black sr-only"
                  >
                    Phone number:
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="phone-input"
                      name="mobileNumber"
                      className="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      pattern="[6-9][0-9]{9}"
                      placeholder="9876543210"
                      maxLength={10}
                      value={userData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block mb-2 mt-3 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Email"
                  name="email"
                  value={userData.email}
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
              {/* Terms Checkbox */}
              <div className="flex items-center mb-4">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  required
                  name="checkbox"
                  value={userData.checkbox}
                  onChange={handleCheckBoxChange}
                />
                <label
                  htmlFor="terms-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {/* Error Message */}
                  {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
                </label>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!userData.checkbox}
                className={`mt-4 w-full py-2 font-semibold rounded-md focus:outline-none focus:ring-2 ${
                  userData.checkbox
                    ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
              >
                Continue
              </button>

              {/* Redirect to Login */}
              <p className="mt-4 text-sm text-right">
                Already have an account?
                <a href="/LogIn" className="text-[#3B71CA] font-medium">
                  <> </>Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
