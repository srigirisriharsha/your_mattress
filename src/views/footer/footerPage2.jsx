import React from 'react';
import bhim_logo from '../../assets/Images/paymentCards/bhim_logo.png';
import visa_logo from '../../assets/Images/paymentCards/visa_logo.png';
import mastercard_logo from '../../assets/Images/paymentCards/mastercard_logo.png';
import gpay_logo from '../../assets/Images/paymentCards/gpay_logo.png';
import ssl_logo from '../../assets/Images/paymentCards/ssl_logo.png';
import iso_logo from '../../assets/Images/paymentCards/iso_logo.png';
import americanExpress_logo from '../../assets/Images/paymentCards/americanExpress_logo.png';
const FooterPage2 = () => {
  return (
    <div className="bg-gradient-to-r from-[#d1cfe3] via-[#a09cb5] to-[#8886a3] text-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* First Column */}
          <div>
            <h2 className="font-semibold mb-4 text-xs">
              DIY Guides & Home Decor Ideas
            </h2>
            <ul className="space-y-2 text-2xs">
              <li className="text-xs">Mattress Size Guide</li>
              <li className="text-xs">Bed Size Guide</li>
              <li className="text-xs">Bed Assembly Guide</li>
              <li className="text-xs">Bedroom Decor Ideas</li>
              <li className="text-xs">Living Room Decor Ideas</li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <h2 className="font-semibold mb-4 text-xs">Retail Stores</h2>
            <ul className="space-y-2">
              <li className="text-xs">
                Ahmedabad | Bengaluru | Chennai | Coimbatore | Delhi | Faridabad
                | Ghaziabad
              </li>
              <li className="text-xs">
                Goa | Greater Noida | Gurugram | Hyderabad | Indore | Jaipur |
                Kochi | Kolkata | Lucknow
              </li>
              <li className="text-xs">
                Mumbai | Mysore | Nagpur | Noida | Patna | Pune | Surat |
                Vadodara | Vijayawada | Visakhapatnam
              </li>
              <li className="text-xs">Furniture Shop | Mattress Shop</li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h2 className="font-semibold mb-4 text-xs">Shop By Cities</h2>
            <ul className="space-y-2">
              <li className="text-xs">Bangalore Mattress | Sofa</li>
              <li className="text-xs">Hyderabad Mattress | Sofa</li>
              <li className="text-xs">Chennai Mattress</li>
              <li className="text-xs">Mumbai Mattress</li>
              <li className="text-xs">Pune Mattress</li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h2 className="font-semibold mb-4 text-xs">Shop By Categories</h2>
            <ul className="space-y-2">
              <li className="text-xs">
                MATTRESSES: Single Bed | Double Bed | King Size | Memory Foam |
                Orthopaedic
              </li>
              <li className="text-xs">
                BEDS: King Size | Queen Size | Hydraulic | Storage
              </li>
              <li className="text-xs">
                ACCESSORIES: Bedding | Bedsheets | Decor | Lights & Lamps
              </li>
              <li className="text-xs">
                FURNITURE: Chairs | Sofas | Wardrobes | TV Units
              </li>
            </ul>
          </div>

          {/* Fifth Column */}
          <div>
            <h2 className="font-semibold mb-4 text-xs">
              Payment & Trusted Sites
            </h2>
            <ul className="space-y-2">
              <li className="text-xs">
                EMI & No Cost EMI | Credit Cards | Debit Cards
              </li>
              <div className="flex space-x-4 mt-4">
                <img
                  src={visa_logo}
                  alt="Visa"
                  className="h-10 rounded-[10px]"
                />
                <img
                  src={mastercard_logo}
                  alt="Mastercard"
                  className="h-10 rounded-[10px]"
                />
                <img
                  src={americanExpress_logo}
                  alt="American Express"
                  className="h-10 rounded-[10px]"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <img
                  src={gpay_logo}
                  alt="Google Pay"
                  className="h-8 rounded-[10px]"
                />
                <img
                  src={bhim_logo}
                  alt="BHIM"
                  className="h-8 rounded-[10px]"
                />
              </div>
              <li className="mt-4 text-xs">
                SSL | ISO Certified | Data Protection
              </li>
              <div className="flex space-x-4 mt-4">
                <img src={ssl_logo} alt="SSL" className="h-8 rounded-[10px]" />
                <img src={iso_logo} alt="ISO" className="h-8 rounded-[10px]" />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage2;
