import React from 'react';
import ReactPlayer from 'react-player';

const YouTubePlayer = ({ url }) => {
  return (
    <div className="w-full h-[350px] p-4 rounded-lg">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        className="rounded-lg"
      />
    </div>
  );
};

const ResponsiveYouTubePlayer = () => {
  const videoUrls = [
    'https://youtu.be/natZndzTU1M?si=74k6aDQJSbFYko0h',
    'https://youtu.be/fapDXGD6EJQ?si=7JKNCGsBdCAMFOmG',
    'https://youtu.be/p0ryxN_ZEac?si=3n7NjOC0_PsukI8A',
    'https://youtu.be/njFLt64Gykk?si=9sykhmXqITLTf4yD',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      {videoUrls.map((url, index) => (
        <div key={index} className="h-auto w-full">
          <YouTubePlayer url={url} />
        </div>
      ))}
    </div>
  );
};

export default ResponsiveYouTubePlayer;
