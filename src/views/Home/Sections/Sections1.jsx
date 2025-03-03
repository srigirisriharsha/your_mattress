import React from 'react';

const Sections1 = () => {
  return (
    <div className="p-4 shadow-shiny bg-white mt-2 ">
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 justify-center">
        <div className="bg-gray-200 p-4 rounded shadow">Component 1</div>
        <div className="bg-gray-200 p-4 rounded shadow">Component 2</div>
        <div className="bg-gray-200 p-4 rounded shadow">Component 3</div>
        <div className="bg-gray-200 p-4 rounded shadow">Component 4</div>
      </div> */}
      <div className="flex flex-row justify-center w-full space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
        <div className="bg-blue-100 flex items-center p-2 shadow-lg rounded-lg flex-col sm:flex-row sm:items-center sm:space-x-4 animate-slideUp">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-l text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <span>Free Delivery</span>
          </div>
        </div>
        <div className="bg-blue-100 flex items-center p-2 shadow-lg rounded-lg flex-col sm:flex-row sm:items-center sm:space-x-4 animate-slideUp">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-l text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <span>upto 10 Year Warranty</span>
          </div>
        </div>
        <div className="bg-blue-100 flex items-center p-2 shadow-lg rounded-lg flex-col sm:flex-row sm:items-center sm:space-x-4 animate-slideUp">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-l text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
              />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <span>14 day FREE trial at select stores</span>
          </div>
        </div>
        <div className="bg-blue-100 flex items-center p-2 shadow-lg rounded-lg flex-col sm:flex-row sm:items-center sm:space-x-4 animate-slideUp">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 px-2 mb-2 sm:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-l text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <span>10K+ Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections1;
