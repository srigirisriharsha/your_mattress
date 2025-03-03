import React from 'react';
import {
  companyName,
  contactNumber1,
  facebookLink,
  instagramLink,
  youtubeChannelLink,
} from '../../components/CustomComponents/Constants';
import logoImage from '../../assets/Images/logoImage.jpg';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-r from-[#6494d3] via-[#42708b] to-[#50a7ee] text-white py-10 rounded-t-3xl">
        {/* <div className="absolute left-0 flex justify-end w-full h-full">
          <Pattern />
          <Pattern1 />
        </div> */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            <div className="w-full">
              <h1 className="text-2xl font-bold">Want to visit our store ?</h1>
              <p className="text-sm">
                Feel free to visit our store at the below Google feed
              </p>
              <div className="w-full h-96 lg:h-[400px] bg-white shadow-lg mt-2 ">
                <div style={{ height: '400px' }}>
                  <iframe
                    src="https://www.google.com/maps/place/Charminar/@17.360611,78.4707408,17z/data=!4m10!1m2!2m1!1scharminar+!3m6!1s0x3bcb978a6e1a939b:0xcb5a69e4aaf113fb!8m2!3d17.3615636!4d78.4746645!15sCgljaGFybWluYXJaCyIJY2hhcm1pbmFykgEIbW9udW1lbnTgAQA!16zL20vMDNuZmxw?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Secunderabad Railway Station"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
              <div>
                <a href="/" aria-label={`${companyName} homepage`}>
                  <img
                    src={logoImage}
                    className="h-8 mr-3 rounded-[10px]"
                    alt={`${companyName} Logo`}
                  />
                  <p className="self-center text-xl font-semibold whitespace-nowrap text-white">
                    {companyName}
                  </p>
                </a>
                <div className="text-500 font-medium mt-4 mb-4">
                  Mattress Manufacturer
                </div>
                <ul className="space-y-2">
                  <li>Careers</li>
                  <li>Become Dealer</li>
                  <li>Investor Relation</li>
                  <li>Business Orders</li>
                  <li>Media Queries</li>
                  <li>Media Coverage</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>Policies</li>
                  <li>FAQs</li>
                  <li>Shipping & Location</li>
                  <li>Payment, Returns & Refunds</li>
                  <div className="grid grid-cols-1 divide-y w-40">
                    <li>Warranty</li>
                    <li className="mt-1 font-semibold">Terms Of Service</li>
                  </div>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Help</h3>
                <p>Contact us at</p>
                <span className="font-bold">{contactNumber1}</span>
                <p className="text-sm mt-2">
                  We are here to help you every day between 9:30 AM to 7:30 PM
                </p>
                <h4 className="text-sm font-semibold mt-4">
                  Registered Office, Manufacturer & Packer
                </h4>
                <p className="text-sm">
                  {companyName}. Ltd. Address: Hyderabad, Telangana, India
                </p>
                <p className="text-sm font-semibold mt-4">
                  Corporate Identity Number: 1234
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <h3 className="text-xl font-bold mb-4">Follow us on Social Media</h3>
          <div className="flex justify-center space-x-4">
            <a
              href={facebookLink}
              className="relative group rounded-full bg-blue-600 text-white p-3 hover:bg-blue-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-6 h-6" />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                Facebook
              </span>
            </a>
            <a
              href={instagramLink}
              className="relative group rounded-full bg-pink-600 text-white p-3 hover:bg-pink-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                Instagram
              </span>
            </a>
            <a
              href={youtubeChannelLink}
              className="relative group rounded-full bg-red-600 text-white p-3 hover:bg-red-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="w-6 h-6" />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                YouTube
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
