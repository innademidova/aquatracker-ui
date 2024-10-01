import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi';

interface AddWaterEntryRequest {
    amount: number,
    date: string;
    time: string;
}

interface DaiLyWaterConsumptionResponse {
    id: number;
    amount: number;
    date: string;
    time: string;
    userId: number;
}

export const waterApi = createApi({
    reducerPath: 'waterApi',
    baseQuery,
    endpoints: (builder) => ({
        addWater: builder.mutation<void, AddWaterEntryRequest>({
            query: (addWaterEntryRequest) => ({
                url: 'Water/add',
                method: 'POST',
                body: addWaterEntryRequest,
            }),
        }),
        deleteWaterEntry: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `Water/${id}/delete`,
                method: 'DELETE',
                body: id,
            }),
        }),
        getDaiLyWaterConsumption: builder.query<DaiLyWaterConsumptionResponse[], string>({
            query: (date: string) => ({ url: `Water/daily-consumption?date=${date}` }),
        }),
    }),
});

export const { useAddWaterMutation, useDeleteWaterEntryMutation, useGetDaiLyWaterConsumptionQuery } = waterApi;
