import dateReducer from "../../features/date/dateSlice.ts";
import { authApi } from "../api/authApi.ts";
import { userApi } from "../api/userApi.ts";
import { waterApi } from "../api/waterApi.ts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [waterApi.reducerPath]: waterApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      waterApi.middleware,
      userApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
