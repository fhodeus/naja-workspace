import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setStorageValue } from '../utils/storage';

export const SOURCE_STORAGE_KEY = 'source';
export const SOURCE_QUERY_KEY = 'source';

export function useSetSource() {
    const [params] = useSearchParams();

    useEffect(() => {
        const source = params.get(SOURCE_QUERY_KEY);
        if (!source) {
            return;
        }

        setStorageValue(SOURCE_STORAGE_KEY, source);
    }, [params]);
}
