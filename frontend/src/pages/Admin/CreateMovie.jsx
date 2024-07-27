import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { useFetchAllGenreQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();
  const { data: allMovie, refetch } = useGetAllMoviesQuery();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetail },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenre } = useFetchAllGenreQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetail);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          rating: 0,
          image: null,
          genre: genres[0]?._id || "",
        });
        setSelectedImage(null);
        await refetch();
        toast.success("Movie added to database");
      }
    } catch (error) {
      console.error("Failed to create movie:", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <>
      <div className="p-4">
        <Link
          to="/admin/movies/dashboard"
          className="text-white hover:text-gray-500 font-semibold"
        >
          Go Back
        </Link>
      </div>
      <div className="container mx-auto flex justify-center items-center mt-4">
        <form className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Create Movie</h2>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Year:
            </label>
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Detail:
            </label>
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-gray-700 text-white h-24"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Cast (comma-separated):
            </label>
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({
                  ...movieData,
                  cast: e.target.value.split(", "),
                })
              }
              className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Genre:
            </label>
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-gray-700 text-white"
            >
              {isLoadingGenre ? (
                <option value="">Loading genres...</option>
              ) : (
                genres?.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-white"
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="mt-4 h-40 w-full object-cover rounded-lg"
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleCreateMovie}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={isCreatingMovie || isUploadingImage}
          >
            {isCreatingMovie || isUploadingImage ? "Creating" : "Create Movie"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMovie;
