import path from 'node:path';

import react from '@vitejs/plugin-react';
import autoprefix from 'autoprefixer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
        tsConfigPaths(),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ReactViteLibrary',
            formats: ['es', 'umd'],
            fileName: (format) => `react-vite-library.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
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
}));
