import { Link } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

function AllComments() {
  const { data: movie, refetch } = useGetAllMoviesQuery();
  const [deleteComment, { isLoading: isDeleteingComment }] =
    useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting comment :", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <Link
          to="/admin/movies/dashboard"
          className="text-white font-semibold hover:text-gray-500 md:mx-80"
        >
          Go Back
        </Link>
      </div>
      <div>
        {movie?.map((m) => (
          <section
            key={m._id}
            className="flex flex-col justify-center items-center"
          >
            {m?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]  "
              >
                <div className="flex justify-between">
                  <strong className="text-[#B0B0B0]">{review.name} </strong>
                  <p className="text-[#B0B0B0]">
                    {review.createdAt.substring(0, 10)}{" "}
                  </p>
                </div>
                <p className="my-4">{review.comment}</p>
                <button
                  className="text-red-500 hover:text-red-800"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

export default AllComments;
