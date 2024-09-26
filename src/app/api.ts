import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface SignInResponse {
    accessToken: string
}

interface SignInRequest {
    email: string,
    password: string
}

export const aquaTrackerApi = createApi({
    reducerPath: 'aquaTrackerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5111/api/',
        credentials: 'include',
    },),
    endpoints: (builder) => ({
        login: builder.mutation<SignInResponse, SignInRequest>({
            query: (singInRequest) => ({
                url: `Auth/signin`,
                method: 'POST',
                body: singInRequest,
            }),
        })
    })
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = aquaTrackerApi;