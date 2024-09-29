import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface SignInResponse {
    accessToken: string
}

interface SignInRequest {
    email: string,
    password: string
}


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5111/api/',
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log('Access token expired, trying to refresh...');

        const refreshResult = await baseQuery(
            { url: 'Auth/refresh', method: 'POST' },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            console.log('Token refreshed, retrying original request...');
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.error('Refresh token expired or invalid, logging out.')
            // api.dispatch(logout());
        }
    }

    return result;
};

export const aquaTrackerApi = createApi({
    reducerPath: 'aquaTrackerApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<SignInResponse, SignInRequest>({
            query: (signInRequest) => ({
                url: `Auth/signin`,
                method: 'POST',
                body: signInRequest,
            }),
        }),
        refresh: builder.mutation<SignInResponse, void>({
            query: () => ({
                url: `Auth/refresh`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation } = aquaTrackerApi;