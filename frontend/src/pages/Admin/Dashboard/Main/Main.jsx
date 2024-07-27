import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealtimeCard from "./RealtimeCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6 ml-64 ">
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="flex flex-wrap justify-between mb-8">
          <SecondaryCard
            pill="Users"
            content={visitors?.length}
            info="20.2k more than usual"
            gradient="from-teal-500 to-lime-400"
          />
          <SecondaryCard
            pill="Comments"
            content={sumOfCommentsLength}
            info="742.9k more than usual"
            gradient="from-[#CCC514] to-[#CDCB8E]"
          />
          <SecondaryCard
            pill="Movies"
            content={allMovies?.length}
            info="387+ more than usual"
            gradient="from-green-500 to-lime-400"
          />
        </div>

        <div className="flex justify-between items-center text-white font-bold mb-4">
          <p>Top Content</p>
          <p>Comments</p>
        </div>

        {topMovies?.map((movie) => (
          <VideoCard
            key={movie._id}
            image={`${baseURL}${movie.image}`}
            title={movie.name}
            date={movie.year}
            comments={movie.numReviews}
          />
        ))}
      </div>

      <div className="flex flex-col w-full  lg:ml-3 lg:w-1/4 mt-10 lg:mt-0">
        <RealtimeCard />
      </div>
    </div>
  );
};

export default Main;
