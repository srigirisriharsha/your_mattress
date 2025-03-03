import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <div className="bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Map Section */}
          <div className="lg:col-span-1">
            <h3 className="text-blue-600 text-xl font-bold mb-4">
              Want to visit our store?
            </h3>
            <div className="w-full h-96 lg:h-[400px] bg-white shadow-lg">
              {/* Embed Google Map for Secunderabad Railway Station */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8657938594047!2d78.46717867516784!3d17.513918783395095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91095e42557f%3A0xc15ae7148d202f4d!2sRelaxPro%20Mattress!5e0!3m2!1sen!2sin!4v1728449698576!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Secunderabad Railway Station Map"
              ></iframe>
            </div>
          </div>

          {/* About Us & Quick Links Section */}
          <div className="lg:col-span-1 space-x-14  flex flex-row items-center">
            {/* About Us Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-700 hover:text-blue-600">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/faq-videos"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    FAQ Videos
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping-details"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Shipping Details
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/refund"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Refund & Cancellations
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-bold mb-4">Follow Our Social Media</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              className="relative group rounded-full bg-blue-600 text-white p-3 hover:bg-blue-800 transition"
            >
              <FaFacebookF className="w-6 h-6" />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                Facebook
              </span>
            </a>

            <a
              href="https://instagram.com"
              className="relative group rounded-full bg-pink-600 text-white p-3 hover:bg-pink-800 transition"
            >
              <FaInstagram className="w-6 h-6" />
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300">
                Instagram
              </span>
            </a>

            <a
              href="https://twitter.com"
              className="relative group rounded-full bg-red-600 text-white p-3 hover:bg-red-800 transition"
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

export default FooterSection;
