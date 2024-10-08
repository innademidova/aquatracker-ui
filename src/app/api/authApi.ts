import { baseQuery } from "./baseApi.ts";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface SignInResponse {
  accessToken: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Access token expired, trying to refresh...");

    const refreshResult = await baseQuery(
      { url: "Auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log("Token refreshed, retrying original request...");
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Refresh token expired or invalid, logging out.");
      // api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: (signInRequest) => ({
        url: `Auth/signin`,
        method: "POST",
        body: signInRequest,
      }),
    }),
    refresh: builder.mutation<SignInResponse, void>({
      query: () => ({
        url: `Auth/refresh-token`,
        method: "POST",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `Auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
