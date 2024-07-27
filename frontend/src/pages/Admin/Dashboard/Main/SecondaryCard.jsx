import React from "react";

const SecondaryCard = ({ pill, content, gradient, info }) => {
  return (
    <div
      className={`w-full lg:w-[15rem] h-[12rem] relative bg-gradient-to-b ${gradient} rounded-lg shadow-lg mb-6 lg:mb-0`}
    >
      <div
        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}
      >
        {pill}
      </div>
      <div className="flex items-center justify-center h-full">
        <h2 className="text-4xl lg:text-5xl font-bold text-white">{content}</h2>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white text-center px-4">
        {info}
      </div>
    </div>
  );
};

export default SecondaryCard;
