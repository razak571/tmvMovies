import { useEffect, useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchAllGenreQuery,
  useFetchSpecificGenreQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

const GenreList = () => {
  const { data: genres, refetch } = useFetchAllGenreQuery();

  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modelVisible, setModelVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.data.name} genre got created`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.genre.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error("Some error ::", result.error);
      } else {
        toast.success(`${result.name} is deletd!`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed, try again");
    }
  };

  return (
    <>
      <div className="p-4">
        <Link
          to="/admin/movies/dashboard"
          className="text-white font-semibold hover:text-gray-500 md:mx-52"
        >
          Go Back
        </Link>
      </div>
      <div className="flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">Manage Genres</h1>
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
          />

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {genres?.map((genre) => (
              <div key={genre._id} className="flex justify-center">
                <button
                  className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200"
                  onClick={() => {
                    setModelVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
          </div>
          <Modal isOpen={modelVisible} onClose={() => setModelVisible(false)}>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              buttonText="Update"
              handleSubmit={handleUpdateGenre}
              handleDelete={handleDeleteGenre}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GenreList;
