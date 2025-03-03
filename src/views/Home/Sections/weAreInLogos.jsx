import React from 'react';
import facebookLogo from '../../../assets/Images/logos/facebook-logo.png';
import instagramLogo from '../../../assets/Images/logos/instagram-logo.png';
import youtubeLogo from '../../../assets/Images/logos/youtube-logos.png';
import {
  facebookLink,
  instagramLink,
  youtubeChannelLink,
} from '../../../components/CustomComponents/Constants';

const WeAreInLogos = () => {
  const images = [
    {
      name: 'facebook',
      imageSrc: facebookLogo,
      link: facebookLink,
    },
    {
      name: 'instagram',
      imageSrc: instagramLogo,
      link: instagramLink,
    },
    { name: 'youtube', imageSrc: youtubeLogo, link: youtubeChannelLink },
  ];

  return (
    <div className="bg-white flex justify-center items-center">
      <div className="m-2 p-2 flex justify-evenly">
        {images.map((e) => (
          <a
            key={e.name}
            href={e.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={e.imageSrc}
              alt={e.name}
              className="w-14 h-14 m-4 transition-transform transform hover:scale-110 hover:shadow-lg"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default WeAreInLogos;
