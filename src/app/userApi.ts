import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GetCurrentUserResponse {
    id: number;
    name: string;
    email: string;
    gender: 'Woman' | 'Man';
    dailyWaterGoal: number;
    weight: number;
    activeTime: number;
}

interface UpdateUserRequest {
    name: string;
    email: string;
    gender?: 'Woman' | 'Man';
    dailyWaterGoal: number;
    weight?: number;
    activeTime?: number;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5111/api/',
        credentials: 'include',
        responseHandler: async (response) => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        },
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query<GetCurrentUserResponse, void>({
            query: () => ({ url: 'Users/me' }),
        }),
        updateProfile: builder.mutation<void, UpdateUserRequest>({
            query: (updateUserRequest) => ({
                url: 'Users',
                method: 'PUT',
                body: updateUserRequest,
            }),
        }),
    }),
});

export const { useGetCurrentUserQuery, useUpdateProfileMutation } = userApi;
