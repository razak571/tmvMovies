import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchAllGenreQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMovieQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner1.1.jpg";
import {
  setFilteredMovies,
  setMoviesFilter,
  setMoviesYear,
  setUniqueYear,
  resetFilters,
} from "../../redux/features/movies/moviesSlice";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data, refetch } = useGetAllMoviesQuery();
  const { data: genres } = useFetchAllGenreQuery();
  const { data: newMovies, refetch: newMovie } = useGetNewMoviesQuery();
  const { data: randomMovies, refetch: randomMovie } = useGetRandomMovieQuery();
  const { data: topMovies, refetch: topMovie } = useGetTopMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (data) {
      const movieYears = data.map((movie) => movie.year);
      const uniqueYear = Array.from(new Set(movieYears));

      dispatch(setFilteredMovies(data));
      dispatch(setMoviesYear(movieYears));
      dispatch(setUniqueYear(uniqueYear));
    }
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    dispatch(setMoviesFilter({ selectedGenre: genreId }));

    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));

    if (filterByGenre.length === 0) {
      toast.error("No Movies Found");
    }
  };

  const handleYearChange = (e) => {
    const movieYear = e.target.value;
    dispatch(setMoviesFilter({ selectedYear: movieYear }));

    const filterByYear = data.filter((movie) => movie.year === +movieYear);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    dispatch(setMoviesFilter({ selectedSort: sortOption }));

    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        newMovie();
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        topMovie();
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        randomMovie();
        break;
      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setFilteredMovies(data));
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-[30rem] w-full mb-10 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
        <div className="relative z-10 text-center text-white mt-16 md:mt-24 lg:mt-32">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">
            The Movies Vault
          </h1>
          <p className="text-xl md:text-2xl">
            A Cinematic Voyage: Discovering Movie Magic
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 sm:px-8 mb-4">
        <input
          type="text"
          className="w-full h-12 border px-4 md:px-6 outline-none rounded mb-4"
          placeholder="Search Movie"
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:space-x-4 mb-4">
          <select
            className="border p-2 rounded text-black mb-2 sm:mb-0"
            value={moviesFilter.selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded text-black mb-2 sm:mb-0"
            value={moviesFilter.selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Year</option>
            {Array.from(new Set(data?.map((movie) => movie.year)))?.map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
          <select
            className="border p-2 rounded text-black mb-2 sm:mb-0"
            value={moviesFilter.selectedSort}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="new">New Movies</option>
            <option value="top">Top Movies</option>
            <option value="random">Random Movies</option>
          </select>
          <button
            onClick={handleResetFilters}
            className="border p-2 rounded text-white bg-teal-500 border-none hover:bg-teal-400 ml-0 sm:ml-4"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AllMovies;
