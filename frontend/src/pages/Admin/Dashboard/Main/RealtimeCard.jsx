import React from "react";
import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealtimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-gray-700 my-7"></div>
      <h2 className="text-2xl font-bold mb-2">{visitors?.length}</h2>
      <p className="text-gray-500 mb-2">Subscribe</p>
      <hr />
      <PrimaryCard />
    </div>
  );
};

export default RealtimeCard;
