import React from 'react';
import {
  companyName,
  // companyName,
  facebookLink,
  instagramLink,
  youtubeChannelLink,
} from '../../components/CustomComponents/Constants';
import moment from 'moment';

const CopyrightFooter = () => {
  return (
    <footer className="py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="text-sm text-gray-500">
            <b>
              © {moment().format('YYYY')} {companyName}.
            </b>
            <> </>All Rights Reserved.
          </span>
          <div className="flex space-x-6">
            <a
              href={facebookLink}
              className="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook page"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href={instagramLink}
              className="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram page"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.31.976.977 1.248 2.244 1.31 3.61.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.977.976-2.244 1.248-3.61 1.31-1.265.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.976-.977-1.248-2.244-1.31-3.61-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.977-.976 2.244-1.248 3.61-1.31 1.265-.058 1.646-.07 4.85-.07zM12 5.838c3.403 0 6.162 2.76 6.162 6.162S15.403 18.162 12 18.162 5.838 15.403 5.838 12 8.597 5.838 12 5.838zm0 10.167c2.211 0 4.005-1.794 4.005-4.005S14.211 7.995 12 7.995 7.995 9.789 7.995 12s1.794 4.005 4.005 4.005zm6.406-10.845a1.44 1.44 0 1 0-.001-2.879 1.44 1.44 0 0 0 .001 2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href={youtubeChannelLink}
              className="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube channel"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M23.498 6.186a2.992 2.992 0 0 0-2.108-2.108C19.682 3.5 12 3.5 12 3.5s-7.682 0-9.39.578a2.992 2.992 0 0 0-2.108 2.108C0 8.19 0 12 0 12s0 3.81.502 5.814a2.992 2.992 0 0 0 2.108 2.108C4.318 20.5 12 20.5 12 20.5s7.682 0 9.39-.578a2.992 2.992 0 0 0 2.108-2.108C24 15.81 24 12 24 12s0-3.81-.502-5.814zM9.75 15.02V8.98L15.75 12l-6 3.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightFooter;
