import React, { useState } from 'react';
import { ClipboardListIcon } from '@heroicons/react/solid';
import { BsPerson } from 'react-icons/bs';
import AdminUserProfile from './AdminUserProfile';
import { useLocation } from 'react-router-dom';
import { FirstLetters } from '../../../components/CustomComponents/utils';
import AdminUserOrders from './AdminUserOrders';

const AdminUserByIdPage = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    {
      id: 'orders',
      label: 'Orders',
      icon: <ClipboardListIcon className="w-5 h-5" />,
    },
    { id: 'profile', label: 'Profile', icon: <BsPerson className="w-5 h-5" /> },
  ];

  return (
    <div className="m-4 p-2 bg-white rounded-lg shadow-lg">
      {/* User Header */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
            <button className="w-10 h-10 bg-gray-200" title={state.user_name}>
              {FirstLetters(state.user_name)}
            </button>
          </div>
          <div className="font-medium text-lg text-black">
            {state.user_name}
          </div>
        </div>
        <div className="w-full h-[2px] bg-gray-200 mt-2 mb-2"></div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <ul className="flex flex-wrap text-sm font-medium text-gray-500 dark:text-gray-400">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                } rounded-t-lg`}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'orders' && (
          <div>
            <AdminUserOrders userData={state} />
          </div>
        )}

        {activeTab === 'profile' && <AdminUserProfile userData={state} />}
      </div>
    </div>
  );
};

export default AdminUserByIdPage;
