import { SOURCE_STORAGE_KEY } from '../../shared/hooks/use-set-source';
import { getStorageValue } from '../../shared/utils/storage';

export const NATIVE_APP_SOURCE = 'nativeapp';

/**
 * Rturns true if we are in an app.
 * @returns
 */
export function isInApp() {
    return getStorageValue(SOURCE_STORAGE_KEY) === NATIVE_APP_SOURCE;
}
