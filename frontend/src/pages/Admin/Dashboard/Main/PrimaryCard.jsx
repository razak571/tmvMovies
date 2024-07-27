import React from "react";
import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-full bg-gray-800 text-white rounded-lg p-4 lg:p-6 mt-4">
      <h2 className="text-xl  font-bold mb-4 text-center lg:text-left  lg:text-base xl:text-xl">
        Congratulations!
      </h2>
      <p className="text-center lg:text-left">
        You have {visitors?.length} new users, watching your content.
      </p>
    </div>
  );
};

export default PrimaryCard;
