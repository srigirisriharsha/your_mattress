import React from 'react';
import ReactPlayer from 'react-player';

const YouTubePlayer = ({ url }) => {
  return (
    <div className="w-full h-[380px] p-4 rounded-lg">
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
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  space-y-4 md:space-y-0 md:space-x-4 p-2">
      <div className="h-auto w-full md:w-1/2">
        <YouTubePlayer
          url={'https://youtu.be/natZndzTU1M?si=74k6aDQJSbFYko0h'}
        />
      </div>
      <div className="h-auto w-full md:w-1/2">
        <YouTubePlayer
          url={'https://youtu.be/fapDXGD6EJQ?si=7JKNCGsBdCAMFOmG'}
        />
      </div>
    </div>
  );
};

export default ResponsiveYouTubePlayer;
