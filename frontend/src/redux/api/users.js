import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiAlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logoutApiCall: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: "",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => `${USERS_URL}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutApiCallMutation,
  useProfileMutation,
  useGetUsersQuery,
} = userApiAlice;
