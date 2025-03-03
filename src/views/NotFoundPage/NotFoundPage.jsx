import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-purple-500">Uh-oh!</h1>
        <p className="text-lg text-gray-700">
          We cannot seem to find the page you are looking for.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          But you can go to our homepage and checkout for the product you are
          looking for.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-4">
          <a href="/Home">Go to Home page</a>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
