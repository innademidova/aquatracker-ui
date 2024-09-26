import { configureStore } from '@reduxjs/toolkit';
import { aquaTrackerApi } from './api';
import authReducer from '../features/auth/authSlice';
import waterReducer from '../features/water/waterSlice';
import { waterApi } from './waterApi';

export const store = configureStore({
    reducer: {
        [aquaTrackerApi.reducerPath]: aquaTrackerApi.reducer,
        [waterApi.reducerPath]: waterApi.reducer,
        auth: authReducer,
        water: waterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(aquaTrackerApi.middleware, waterApi.middleware),
});

// Создаем типы на основе конфигурации хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
