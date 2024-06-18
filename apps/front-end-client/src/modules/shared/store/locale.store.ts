import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { config } from '../../../config/config';
import type { RootState } from '../../main/store/root.store';
import { getLocaleMessages, parseLocale, isValidLocale } from '../utils/language';

interface ILocaleState {
    fullLocale: string;
    language: string;
    region?: string;
    script: string;
    messages: Record<string, string>;
    isLoading: boolean;
    error: boolean;
}

interface IChangeLocale {
    fullLocale: string;
    language: string;
    jurisdiction?: string;
    region?: string;
    script?: string;
}

const defaultLocale = parseLocale(
    isValidLocale(navigator.language) ? navigator.language : config.DEFAULT_LOCALE,
);
const defaultScript = defaultLocale.script ?? 'Latn';
const defaultRegion = defaultLocale.region;

export const loadLocaleMessages = createAsyncThunk(
    'locale/getLocaleMessages',
    async (locale: string) => {
        const response = await getLocaleMessages(locale);
        return response;
    },
);

export const localeStore = createSlice({
    name: 'locale',
    initialState: {
        fullLocale: defaultLocale.toString(),
        language: defaultLocale.language,
        script: defaultScript,
        region: defaultRegion,
        isLoading: false,
        messages: {},
    } as ILocaleState,
    reducers: {
        changeLocale(state, { payload }: PayloadAction<IChangeLocale>) {
            state.language = payload.language;
            state.region = payload.region;

            state.script = payload.script ?? defaultScript;
            state.fullLocale = payload.fullLocale;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadLocaleMessages.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loadLocaleMessages.fulfilled, (state, action) => {
            state.messages = action.payload.response;
            state.isLoading = false;
        });

        builder.addCase(loadLocaleMessages.rejected, (state) => {
            state.isLoading = false;
            // TODO: What sort of error handling?
        });
    },
});

const selectLocaleStore = (state: RootState) => {
    return state[localeStore.name];
};

export const selectFullLocale = createSelector(
    selectLocaleStore,
    (localeState) => localeState.fullLocale,
);

export const selectMessages = createSelector(
    selectLocaleStore,
    (localeState) => localeState.messages,
);

export const selectLanguage = createSelector(selectLocaleStore, (localeState) => {
    return localeState.language;
});

export const selectLoading = createSelector(selectLocaleStore, (localeState) => {
    return localeState.isLoading;
});

export const selectCountry = createSelector(selectLocaleStore, (localeState) => {
    return localeState.region;
});

export const selectError = createSelector(selectLocaleStore, (localeState) => {
    return localeState.error;
});

export const selectLocale = createSelector(selectLocaleStore, (localeState) => {
    if (!localeState.region) {
        return localeState.language;
    }

    return `${localeState.language}-${localeState.region}`;
});
