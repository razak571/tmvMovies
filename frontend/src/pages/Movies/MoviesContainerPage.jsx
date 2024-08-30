import { useEffect, useState } from "react";
import {
  useGetAllMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMovieQuery,
} from "../../redux/api/movies";
import { useFetchAllGenreQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SliderUtil";
import { BiSolidMoviePlay } from "react-icons/bi";

const MoviesContainerPage = () => {
  const { data, refetch } = useGetAllMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchAllGenreQuery();
  const { data: randomMovies } = useGetRandomMovieQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  const handleResetHandler = () => {
    setSelectedGenre(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-8 w-full lg:w-11/12">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Top Rated Movies
        </h1>
        <SliderUtil
          data={topMovies}
          slidesToShow={3}
          autoplay={true}
          autoplaySpeed={3000}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between lg:mt-10">
        <nav className="flex flex-wrap justify-center lg:mt-12  lg:justify-start mb-4 lg:mb-0 lg:flex-col lg:w-1/4">
          <button
            className="transition duration-300 ease-in-out hover:text-gray-500 p-2 rounded mb-2 text-lg flex items-center"
            onClick={handleResetHandler}
          >
            <span className="mr-2">All</span>
            <BiSolidMoviePlay size={26} />
          </button>
          {genres?.map((g) => (
            <button
              className={`transition duration-300 ease-in-out hover:text-gray-500 flex items-center p-2 rounded mb-2 text-lg ${
                selectedGenre === g._id ? "bg-gray-500" : ""
              }`}
              key={g._id}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </nav>

        <div className="w-full  lg:w-10/12 lg:mr-5">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Choose Your Movie
          </h1>
          {filteredMovies?.length === 0 ? (
            <h1 className="flex items-center justify-center mt-10 lg:mt-36 text-red-500 font-extrabold">
              No Movies Found For Seleted Genre
            </h1>
          ) : (
            <SliderUtil
              data={filteredMovies}
              slidesToShow={2}
              autoplay={true}
              autoplaySpeed={4000}
            />
          )}
        </div>
      </div>
      <div className="mb-8 w-full lg:w-11/12 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Suggested For You
        </h1>
        <SliderUtil data={randomMovies} slidesToShow={4} autoplay={true} />
      </div>
    </div>
  );
};

export default MoviesContainerPage;
