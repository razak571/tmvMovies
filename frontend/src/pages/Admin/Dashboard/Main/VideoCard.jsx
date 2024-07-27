import React from "react";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex items-center w-full mt-5 bg-gray-800 rounded-lg p-4">
      <div>
        <img src={image} alt="card-image" className="h-[3rem] " />
      </div>
      <div className="ml-4">
        <h2 className="text-lg text-white">{title}</h2>
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="flex-grow flex justify-end items-center">
        <div className="text-white text-lg">{comments}</div>
      </div>
    </div>
  );
};

export default VideoCard;
