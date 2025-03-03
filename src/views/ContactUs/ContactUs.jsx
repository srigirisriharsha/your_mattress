import React, { useState } from 'react';
import ContactUs from '../../assets/Images/ContactUs.png';
import {
  companyMail,
  companyName,
  contactNumber1,
  contactNumber2,
} from '../../components/CustomComponents/Constants';
import indianFlag from '../../assets/Images/indianFlag.png';
import { contactus } from '../../services/login/loginServices';
import moment from 'moment';

const ContactUsPage = () => {
  const defaultValues = {
    name: '',
    message: '',
    mobileNumber: '',
    email: '',
    address: '',
  };
  const [userData, setUserData] = useState(defaultValues);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitButtonLoading(true);
    e.preventDefault();
    const userObject = {
      name: userData.name,
      email: userData.email,
      message: userData.message,
      mobile: userData.mobileNumber,
      createdDate: moment().format('DD-MM-YYYY'),
      status: 'Open',
      assignedTo: 1,
    };
    const resp = await contactus(userObject);
    if (resp && resp?.data) {
      if (resp?.data?.success) {
        setUserData(defaultValues);
        setTimeout(() => {
          setIsSubmitButtonLoading(false);
          setTimeout(() => {
            setIsSubmitButtonLoading(null);
          }, 1000);
        }, 500);
      } else {
        setIsSubmitButtonLoading(null);
      }
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100`}
    >
      <div className="container mx-auto px-6 py-12 animate-slideUp">
        {/* Main container with two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side: Image and company info */}

          <div
            className="flex justify-center"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            <div className="flex flex-col items-center justify-center ">
              {/* Contact Us Image */}
              <img
                src={ContactUs}
                alt="Contact Us"
                className="h-56 w-56 lg:h-72 lg:w-72 rounded-full object-cover mb-6 "
              />

              {/* Company Information */}
              <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
                {companyName}
              </h1>
              <br />
              {/* Contact Details */}
              <div className="text-lg space-y-2 flex flex-col text-left">
                <p>
                  <strong>Sales Query:</strong>
                  <a
                    href={`tel:+91${contactNumber1}`}
                    className="text-blue-600 ml-2"
                  >
                    {contactNumber1}
                  </a>
                </p>
                <p>
                  <strong>Customer Support:</strong>
                  <a
                    href={`tel:+91${contactNumber2}`}
                    className="text-blue-600 ml-2"
                  >
                    {contactNumber2}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>
                  <a
                    href={`mailto:${companyMail}`}
                    className="text-blue-600 ml-2"
                  >
                    {companyMail}
                  </a>
                </p>
                <p className="mt-4 text-gray-500">
                  <strong>Address:</strong> Charminar, Hyderabad, Telangana,
                  India
                </p>
              </div>
            </div>
          </div>
          {/* Right side: Contact form */}
          <div className="bg-white p-8 rounded-lg shadow-[0_4px_6px_rgba(67,47,132,0.3)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
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
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="flex">
                  <button
                    id="dropdown-phone-button"
                    className="flex-shrink-0 inline-flex items-center py-2 px-4 text-sm font-medium text-center border border-gray-300 rounded-l-md hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                    type="button"
                  >
                    <img
                      src={indianFlag}
                      alt="India Flag"
                      className="h-4 w-4 mr-2"
                    />
                    +91
                  </button>
                  <input
                    type="text"
                    id="phone-input"
                    name="mobileNumber"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                    pattern="[6-9][0-9]{9}"
                    placeholder="9876543210"
                    maxLength={10}
                    value={userData.mobileNumber}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
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

              {/* Description Input */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  How can we help you?
                </label>
                <textarea
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Message"
                  name="message"
                  value={userData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 font-semibold rounded-md text-white bg-yellow-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isSubmitButtonLoading === true} // Disable button when submitting
              >
                {isSubmitButtonLoading === true
                  ? 'Submitting'
                  : isSubmitButtonLoading === false
                    ? 'Submitted Successfully'
                    : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
