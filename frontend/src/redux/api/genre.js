import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),

    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    fetchAllGenre: builder.query({
      query: () => ({
        url: `${GENRE_URL}/list-all`,
        method: "GET",
      }),
    }),

    fetchSpecificGenre: builder.query({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchAllGenreQuery,
  useFetchSpecificGenreQuery,
} = genreApiSlice;
