import React from "react";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";
import SliderUtil from "../../components/SliderUtil";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between p-4 pt-0">
      <nav className="flex flex-wrap justify-center lg:w-1/4 mb-4 lg:mt-20 lg:mb-0 lg:flex-col lg:justify-start ">
        <Link
          to="/"
          className="transition duration-300 ease-in-out text-white hover:text-gray-500 block p-2 rounded mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out text-white hover:text-gray-500 block p-2 rounded mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>
      <div className="w-full lg:w-10/12 mt-10 lg:mt-0 lg:mr-5">
        <SliderUtil
          data={data}
          slidesToShow={2}
          autoplay={true}
          autoplaySpeed={2000}
        />
      </div>
    </div>
  );
};

export default Header;
