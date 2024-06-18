import { basename, dirname, extname, join, relative } from 'path';
import type { Plugin } from 'rollup';

interface ITypescriptDevPlugin {
    outDirectory: string;
    sourceDirectory: string;
}

/**
 * Creates .d.ts files for development mode for IDE support.
 * @param options
 * @returns
 */
export const typescriptDevPlugin = (options: ITypescriptDevPlugin): Plugin => {
    return {
        name: 'typescript-dev-plugin',
        async transform(code, id) {
            if (!id.endsWith('.ts') && !id.endsWith('.tsx')) {
                return;
            }

            const projectDir = dirname(options.outDirectory);
            const srcDir = join(projectDir, options.sourceDirectory);
            const relPath = relative(srcDir, dirname(id));
            const chunkName = basename(id, extname(id));
            const fileLocation = join(relPath, `${chunkName}.d.ts`);

            this.emitFile({
                type: 'asset',
                fileName: fileLocation,
                source: `export * from ${JSON.stringify(id.replace(/.ts$/, ''))};`,
            });

            return code;
        },
    };
};
