import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="px-4 md:flex md:space-x-8 -ml-5">
      <div className="md:w-2/3">
        <section>
          {userInfo ? (
            <form
              onSubmit={submitHandler}
              className="max-w-2xl mx-auto md:max-w-full md:mx-0"
            >
              <div className="my-4">
                <label htmlFor="comment" className="block text-xl mb-2">
                  Write Your Review
                </label>
                <textarea
                  id="comment"
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="p-2 border rounded-lg w-full text-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Submit
              </button>
            </form>
          ) : (
            <p>
              Please{" "}
              <Link to="/login" className="text-teal-500">
                Sign In
              </Link>{" "}
              to write a review
            </p>
          )}
        </section>
        <section className="mt-8">
          {movie?.reviews.length === 0 && (
            <p className="max-w-2xl mx-auto md:max-w-full md:mx-0">
              No Reviews Found
            </p>
          )}
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-800 p-4 rounded-lg my-4 max-w-2xl mx-auto md:max-w-full md:mx-0"
            >
              <div className="flex justify-between">
                <strong className="text-gray-400">{review.name}</strong>
                <p className="text-gray-400">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </section>
      </div>
      <div className="md:w-1/3 md:mt-12 ">
        <div className="bg-gray-800 rounded-lg p-4 h-64 md:m-2 sm:my-4 mb-2">
          <h3 className="text-xl font-bold">Trailers</h3>
          <div className="mt-4 h-full flex items-center justify-center">
            <p className="text-gray-400">Trailer placeholder</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 h-64 md:m-2 sm:my-4 mb-2">
          <h3 className="text-xl font-bold">Trailers</h3>
          <div className="mt-4 h-full flex items-center justify-center">
            <p className="text-gray-400">Trailer placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTabs;
