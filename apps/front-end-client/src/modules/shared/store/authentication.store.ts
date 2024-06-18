import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../main/store/root.store';

interface IAuthenticationState {
    isLoggedIn: boolean;
    username: string | null;
    email: string | null;
    profileId: string | null;
    onContext: boolean;
}

interface ILoginAction {
    username: string;
    email: string;
    profileId: string;
}

export const authenticationStore = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: false,
        username: null,
        email: null,
        profileId: null,
        onContext: (window as unknown as { kcContext: unknown }).kcContext !== undefined,
    } as IAuthenticationState,
    reducers: {
        login(state, { payload }: PayloadAction<ILoginAction>) {
            state.email = payload.email;
            state.username = payload.username;
            state.profileId = payload.profileId;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        closeLogin(state, { payload }: PayloadAction<{onOpen:boolean}>) {
            state.onContext = payload.onOpen;
        },
    },
});

const selectAuthenticationStore = (state: RootState) => {
    return state[authenticationStore.name];
};

export const selectIsOnContext = createSelector(
    selectAuthenticationStore,
    (layoutState) => layoutState.onContext,
);
