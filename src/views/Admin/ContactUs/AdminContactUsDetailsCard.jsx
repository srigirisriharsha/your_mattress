import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FirstLetters } from '../../../components/CustomComponents/utils';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import moment from 'moment';
import { useAuth } from '../../../context/MainContext';
import { updateContactusDetails } from '../../../services/admin/adminservice';

const AdminContactUsDetailsCard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [statusValue, setStatusValue] = useState(state?.status);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(null);
  const { admin } = useAuth();
  const goToContactUsView = () => {
    navigate(`/admin/contact-us`);
  };
  const handleUpdateContactusDetails = async () => {
    // e.preventDefault();
    try {
      setIsSubmitButtonLoading(true);
      if (admin) {
        const obj = {
          id: state.id,
          moveStatusTo: 'Closed',
          updatedDate: moment().format('DD-MM-YYYY'),
          updatedBy: admin,
        };
        const response = await updateContactusDetails(obj);
        if (response?.data) {
          if (response?.data?.success) {
            setStatusValue('Closed');
            setTimeout(() => {
              setIsSubmitButtonLoading(false);
              setTimeout(() => {
                setIsSubmitButtonLoading(null);
              }, 1000);
            }, 500);
          } else {
            setIsSubmitButtonLoading(null);
          }
        } else {
          setIsSubmitButtonLoading(null);
        }
      }
    } catch (error) {
      console.log(error);
      setIsSubmitButtonLoading(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="w-full  mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-2">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl md:text-3xl"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              Contact Us
            </h1>
          </div>
          <div className="w-full h-[2px] bg-[#1d4ed8] mt-1"></div>
        </div>
        <div
          key={state?.key}
          className="bg-white border p-4 rounded-lg shadow-md mt-4"
        >
          <div className="mb-2 flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                  <button
                    className="w-10 h-10 bg-gray-200"
                    title={state.user_name}
                  >
                    {FirstLetters(state.user_name)}
                  </button>
                </div>
                <div>
                  <div className="font-medium text-lg text-black">
                    {state.user_name}
                  </div>
                  <div className="font-medium text-xs text-gray-400">
                    {state.created_date}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 font-semibold rounded-lg text-center  ${
                  statusValue === 'Open'
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {statusValue}
              </span>
            </div>
          </div>
          <div className="w-full h-[2px] bg-gray-200 mb-2"></div>
          <div>
            <div>
              <p className="text-sm text-gray-500">
                <b>Email : </b>
                {state?.user_email}
              </p>
              <p className="text-sm text-gray-500">
                <b>Mobile : </b>
                {state?.user_mobile_number}
              </p>
            </div>
          </div>
          <br />
          <p className="text-sm text-gray-500">
            <b>Message : </b>
            {state?.user_message}
          </p>
          <br /> <br />
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <div className="flex justify-start">
              <button
                onClick={goToContactUsView}
                className="btn btn-primary flex items-center  hover:bg-violet-700  bg-violet-500  text-white px-2 py-1 font-semibold rounded-lg text-center "
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
            </div>

            {/* Mark as Closed Button */}
            <div>
              {statusValue === 'Open' && (
                <button
                  disabled={isSubmitButtonLoading === true}
                  onClick={handleUpdateContactusDetails}
                  className="btn btn-primary flex items-center hover:bg-blue-700  bg-blue-500 text-white px-2 py-1 font-semibold rounded-lg text-center"
                >
                  <FaArrowRight className="mr-2" />
                  {isSubmitButtonLoading === true
                    ? 'Closing'
                    : isSubmitButtonLoading === false
                      ? 'Closed Successfully'
                      : 'Mark as Closed'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactUsDetailsCard;
