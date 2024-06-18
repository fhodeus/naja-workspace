import { config } from '../../../config/config';

export function getAssetUrl(assetPath?: string | null) {
    if (!assetPath) {
        return;
    }

    return `${config.ASSET_URL}${assetPath}`;
}
