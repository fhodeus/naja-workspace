import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { layoutStore } from '../../shared/store/layout.store';

export const store = configureStore({
    reducer: {
        [layoutStore.name]: layoutStore.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
