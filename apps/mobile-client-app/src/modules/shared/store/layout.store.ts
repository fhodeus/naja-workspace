import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../main/store/root.store';

interface ILayoutState {
    isMainMenuOpen: boolean;
    isFullscreen: boolean;
    name: string;
}

export const layoutStore = createSlice({
    name: 'layout',
    initialState: {
        isMainMenuOpen: false,
        isFullscreen: false,
        name: '',
    } as ILayoutState,
    reducers: {
        toggleMainMenu(state) {
            state.isMainMenuOpen = !state.isMainMenuOpen;
        },
        setFullscreen(state, action: PayloadAction<boolean>) {
            state.isFullscreen = action.payload;
        },
        setDashboardHeader(state, action: PayloadAction<string>){
            state.name = action.payload;
        }
    },
});

const selectLayoutStore = (state: RootState) => {
    return state[layoutStore.name];
};

export const selectIsMainMenuOpen = createSelector(
    selectLayoutStore,
    (layoutState) => layoutState.isMainMenuOpen,
);

export const selectFullscreen = createSelector(
    selectLayoutStore,
    (layoutState) => layoutState.isFullscreen,
);

export const selectDashboardName = createSelector(
    selectLayoutStore,
    (layoutState) => layoutState.name,
);
