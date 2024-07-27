import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
