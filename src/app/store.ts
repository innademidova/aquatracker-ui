import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { waterApi } from './waterApi';
import { userApi } from './userApi';
import dateReducer from '../features/date/dateSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [waterApi.reducerPath]: waterApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        date: dateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, waterApi.middleware, userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
