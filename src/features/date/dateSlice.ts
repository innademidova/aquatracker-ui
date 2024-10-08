import { RootState } from "@/app/store/store.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface DateState {
  selectedDate: string;
}

const initialState: DateState = {
  selectedDate: dayjs().format("YYYY-MM-DD"),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const selectedDate = (state: RootState) => state.date.selectedDate;
export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;
