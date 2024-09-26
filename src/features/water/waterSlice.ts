import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

interface WaterEntry {
    id: number;
    amount: number
    time: string;
    userId: number;
}

interface WaterState {
    dailyConsumption: WaterEntry[];
    monthlyConsumption: WaterEntry[];
}

const initialState: WaterState = {
    dailyConsumption: [],
    monthlyConsumption: []
};

const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        setDailyConsumption: (state, action: PayloadAction<WaterEntry[]>) => {
            state.dailyConsumption = action.payload;
        },
    },
});

export const getDailyConsumption = (state: RootState) => state.water.dailyConsumption;
export const { setDailyConsumption } = waterSlice.actions;

export default waterSlice.reducer;
