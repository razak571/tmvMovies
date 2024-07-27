import React from "react";
import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Movies ({movies?.length})</h1>
        <Link
          to={`/admin/movies/dashboard`}
          className="text-white hover:text-gray-500 font-semibold"
        >
          Go Back
        </Link>
      </div>

      <div className="flex flex-wrap justify-center">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div className="bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img
                  src={`${baseURL}${movie.image}`}
                  alt={movie.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <h2 className="text-white text-xl font-bold">{movie.name}</h2>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  {movie.detail}
                </p>
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="inline-block bg-teal-400 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded mt-auto"
                >
                  Update Movie
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMoviesList;
