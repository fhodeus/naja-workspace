import { useMemo } from 'react';

import { getAssetUrl } from '../utils/get-asset-url';

export function useImageCDN(imagePath: string | undefined | null, width?: number) {
    return useMemo(() => {
        const assetUrl = getAssetUrl(imagePath);

        if (!imagePath || !width || !assetUrl) {
            return;
        }

        const url = new URL(assetUrl);
        url.searchParams.set('w', Math.ceil(width).toString());
        url.searchParams.set('dpr', window.devicePixelRatio.toString());
        url.searchParams.set('fit', 'max');
        url.searchParams.set('auto', 'format');
        return url.toString();
    }, [imagePath, width]);
}
