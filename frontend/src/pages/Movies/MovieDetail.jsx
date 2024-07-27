import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddMovieReviewMutation,
  useGetSpecificMovieQuery,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetail = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [addMovieReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addMovieReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setComment("");
      toast.success("Review created successfully");
    } catch (error) {
      console.log("error", error);
      toast.error(error.data || error.message);
      setComment("");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="p-4">
        <Link
          to="/"
          className="text-white font-semibold hover:text-gray-500 md:mx-12"
        >
          Go Back
        </Link>
      </div>
      <div className="mt-8 px-4 md:px-16">
        <div className="flex flex-col items-center">
          <img
            src={`${baseURL}${movie?.image}`}
            alt={movie?.name}
            className="w-full md:w-full lg:w-full rounded-md mb-8"
          />
          <div className="md:flex md:w-full">
            <div className="md:w-2/3 md:pr-8">
              <h2 className="text-3xl md:text-5xl font-extrabold">
                {movie?.name}
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl">{movie?.detail}</p>
              <p className="mt-4 text-2xl font-semibold">
                Releasing Date: {movie?.year}
              </p>
            </div>
            <div className="md:w-1/3 md:ml-8">
              <h3 className="text-xl font-bold mt-8 md:mt-0">Cast:</h3>
              <ul className="mt-2">
                {movie?.cast.map((c, idx) => (
                  <li key={idx} className="mt-1 text-gray-400">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
