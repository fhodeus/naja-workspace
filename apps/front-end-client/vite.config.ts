import { readFile } from 'fs/promises';
import { createRequire } from 'module';
import { join } from 'path';

import react from '@vitejs/plugin-react';
import autoprefix from 'autoprefixer';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default async ({ mode }: { mode: string }) => {
    const environment = process.env.CONFIG_ENV ?? 'development';

    const APP_CONFIG_BUFFER = await readFile(join('src', 'config', `config.${environment}.json`));
    const APP_CONFIG = APP_CONFIG_BUFFER.toString('utf-8');

    return {
        mode,
        build: {
            sourcemap: true,
            chunkSizeWarningLimit: environment === 'production' ? 5300 : 100000,
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
                onwarn: (warning) => {
                    if (warning.code === 'NAMESPACE_CONFLICT') {
                        return;
                    }

                    return warning;
                },
            },
        },
        define: {
            APP_CONFIG,
            'process.env.NODE_ENV': (mode === 'staging' && '"production"') || `"${mode}"`,
        },
        server: {
            host: 'front-end-client.localhost',
            port: 3000,
            https: {
                key: './.certs/server.key',
                cert: './.certs/server.crt',
            },
        },
        resolve: {
            alias: {
                'react-redux': require.resolve('react-redux/es/next'),
            },
        },
        plugins: [
            react({
                babel: {
                    plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
                },
            }),
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefix(),
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            },
                        },
                    },
                ],
            },
        },
        test: {
            globals: true,
            watch: true,
            environment: 'jsdom',
            setupFiles: './vitest.setup.ts',
            resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
            },
        },
    };
};
