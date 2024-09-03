import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { authenticationStore } from '../../shared/store/authentication.store';
import { layoutStore } from '../../shared/store/layout.store';
import { localeStore } from '../../shared/store/locale.store';

export const store = configureStore({
    reducer: {
        [localeStore.name]: localeStore.reducer,
        [layoutStore.name]: layoutStore.reducer,
        [authenticationStore.name]: authenticationStore.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;