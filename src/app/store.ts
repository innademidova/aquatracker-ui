import { configureStore } from '@reduxjs/toolkit';
import { aquaTrackerApi } from './api';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [aquaTrackerApi.reducerPath]: aquaTrackerApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(aquaTrackerApi.middleware),
});

// Создаем типы на основе конфигурации хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
