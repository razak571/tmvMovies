import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: "",
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYear: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },

    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },

    setMoviesYear: (state, action) => {
      state.movieYears = action.payload;
    },

    setUniqueYear: (state, action) => {
      state.uniqueYear = action.payload;
    },

    resetFilters: (state) => {
      state.moviesFilter = {
        searchTerm: "",
        selectedGenre: "",
        selectedYear: "",
        selectedSort: [],
      };
    },
  },
});

export const {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYear,
  setUniqueYear,
  resetFilters,
} = moviesSlice.actions;

export default moviesSlice.reducer;
