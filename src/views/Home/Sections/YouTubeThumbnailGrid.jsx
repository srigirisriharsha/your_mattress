import React from 'react';
import youtube_logo from '../../../assets/Images/logos/youtube-logo.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel CSS
import Slider from 'react-slick';
import { settings } from './TestimonialCarousel';
import { videoLinks } from '../../../components/CustomComponents/utils';

const YouTubeThumbnailGrid = () => {
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/shorts\/|watch\?vi=|user\/\S+|playlist\S+)?|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleThumbnailClick = (link) => {
    // Open the video in a new tab
    window.open(link, '_blank');
  };

  return (
    <div className="animate-slideUp">
      {/* <div className="w-full mx-auto p-4 md:p-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            In YouTube
          </h1>
        </div>
        <div className="w-full h-[2px] bg-blue-500 mt-2"></div>
      </div> */}
      <div className="slider-container bg-gray-100 p-4  m-4">
        <Slider {...settings}>
          {videoLinks.map((link, index) => {
            const videoId = getYouTubeVideoId(link);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return (
              <div key={index}>
                <div className="mr-4 mb-4bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                  {/* Added overflow-hidden */}
                  <div
                    className="relative h-44"
                    onClick={() => handleThumbnailClick(link)}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={`YouTube Thumbnail ${index + 1}`}
                      className="transform transition-transform duration-500 absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg hover:scale-95 transition-transform duration-300"
                    />

                    {/* YouTube Play Icon in the center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={youtube_logo}
                        alt="YouTube Play Button"
                        className="h-20 w-20 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default YouTubeThumbnailGrid;
