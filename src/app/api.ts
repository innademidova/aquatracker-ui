import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface LoginResponse {
    accessToken: string
}

interface LoginRequest {
    email: string,
    password: string
}

export const aquaTrackerApi = createApi({
    reducerPath: 'twitPosterApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5111/api/'}),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (loginRequest) => ({
                url: `Auth/login`,
                method: 'POST',
                body: loginRequest,
            }),
        })
    })
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useLoginMutation} = aquaTrackerApi;