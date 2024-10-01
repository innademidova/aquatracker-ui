import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

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
    baseQuery,
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
