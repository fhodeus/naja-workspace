import { constants } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';
import type { Plugin } from 'rollup';

interface IBuilderExtensions {
    plugins: Plugin[];
}

const EXTENSION_FILE_NAME = 'dragon.config.js';

export async function loadBuilderExtensions(cwd: string): Promise<IBuilderExtensions> {
    const hasExtensions = await access(join(cwd, EXTENSION_FILE_NAME), constants.F_OK)
        .then(() => true)
        .catch(() => false);

    if (hasExtensions) {
        require = require('esm-wallaby')(module);
        const extensions: { default: Partial<IBuilderExtensions> } = require(join(
            cwd,
            EXTENSION_FILE_NAME,
        ));

        return {
            plugins: extensions.default.plugins ?? [],
        };
    }

    return { plugins: [] };
}
