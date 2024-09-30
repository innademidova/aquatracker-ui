import { configureStore } from '@reduxjs/toolkit';
import { aquaTrackerApi } from './api';
import authReducer from '../features/auth/authSlice';
import waterReducer from '../features/water/waterSlice';
import { waterApi } from './waterApi';
import { userApi } from './userApi';
import dateReducer from '../features/date/dateSlice';

export const store = configureStore({
    reducer: {
        [aquaTrackerApi.reducerPath]: aquaTrackerApi.reducer,
        [waterApi.reducerPath]: waterApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer,
        water: waterReducer,
        date: dateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(aquaTrackerApi.middleware, waterApi.middleware, userApi.middleware),
});

// Создаем типы на основе конфигурации хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
