import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi';

interface AddWaterEntryRequest {
    amount: number,
    date: string;
    time: string;
}

export interface WaterConsumptionResponse {
    id: number;
    amount: number;
    date: string;
    time: string;
    userId: number;
}

interface GetMonthlyWaterConsumptionRequest {
    year: number;
    month: number;
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
        getDaiLyWaterConsumption: builder.query<WaterConsumptionResponse[], string>({
            query: (date: string) => ({ url: `Water/daily-consumption?date=${date}` }),
        }),
        getMonthlyWaterConsumption: builder.query<WaterConsumptionResponse[], GetMonthlyWaterConsumptionRequest>({
            query: (getMonthlyWaterConsumptionRequest) => ({ url: `Water/monthly-consumption?year=${getMonthlyWaterConsumptionRequest.year}&month=${getMonthlyWaterConsumptionRequest.month}`}),
        })
    }),
});

export const { useAddWaterMutation, useDeleteWaterEntryMutation, useGetDaiLyWaterConsumptionQuery, useGetMonthlyWaterConsumptionQuery } = waterApi;
