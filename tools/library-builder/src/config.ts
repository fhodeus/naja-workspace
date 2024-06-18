import fastGlob from 'fast-glob';
import type { ExternalOption } from 'rollup';
import { defineConfig } from 'rollup';
import { join } from 'path';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptDevPlugin } from './plugins/typescript-dev';

import { isExternal } from './utils/is-external';
import { loadBuilderExtensions } from './utils/load-extensions';

const IGNORED_WARNINGS = ['EMPTY_BUNDLE'];

export enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

async function getCompilerPlugin(
    mode: Environment,
    useTypescript: boolean,
    sourceDirectory: string,
    outDirectory: string,
) {
    if (mode === Environment.PRODUCTION && useTypescript) {
        return [
            (await import('@rollup/plugin-typescript')).default({
                tsconfig: join(process.cwd(), 'tsconfig.json'),
            }),
        ];
    }

    return [
        (await import('rollup-plugin-esbuild')).default({
            target: 'es2020',
        }),
        typescriptDevPlugin({
            sourceDirectory,
            outDirectory,
        }),
    ];
}

export function isEnvironment(mode?: string): mode is Environment {
    if (!mode) {
        return false;
    }

    return [Environment.DEVELOPMENT, Environment.PRODUCTION].includes(mode as Environment);
}

export async function createConfiguration({
    entries = './src/**/*.(ts|js)',
    outDirectory = './dist',
    outFormat = 'esm',
    sourceDirectory = './src',
    enableSupport = {
        typescript: true,
    },
    external,
    replaceEnv = true,
    buildEnv = isEnvironment(process.env.BUILD_ENV)
        ? process.env.BUILD_ENV
        : Environment.DEVELOPMENT,
    configEnv = isEnvironment(process.env.CONFIG_ENV)
        ? process.env.CONFIG_ENV
        : Environment.DEVELOPMENT,
}: {
    entries?: string;
    outFormat?: 'esm' | 'cjs';
    replaceEnv?: boolean;
    outDirectory?: string;
    sourceDirectory?: string;
    external?: ExternalOption;
    buildEnv?: Environment;
    configEnv?: Environment;
    enableSupport?: {
        typescript: boolean;
    };
}) {
    const extensions = await loadBuilderExtensions(process.cwd());
    const input = await fastGlob([entries, '!./**/*.d.ts', '!./**/*.spec.ts'], {
        cwd: process.cwd(),
    });

    return defineConfig({
        input,
        output: {
            format: outFormat,
            dir: outDirectory,
            exports: 'named',
            preserveModules: true,
        },
        treeshake: true,
        context: 'global',
        external: external
            ? external
            : (id: string) => {
                  return isExternal(id);
              },
        onwarn: (warning, warn) => {
            if (IGNORED_WARNINGS.includes(warning.code!)) {
                return;
            }

            if (warning.code === 'CIRCULAR_DEPENDENCY') {
                console.error(
                    'Error: Circular dependencies are an error. When using a ESM with a circular dependency it will confuse most bundlers (webpack, esbuild) into not knowing the correct order to load the dependencies causing run time errors.',
                );
                warn(warning);
                return;
            }

            if (warning.loc) {
                console.error(
                    [
                        warning.loc.file,
                        `error ${warning.loc.line}:${warning.loc.column} ${warning.message}`,
                    ].join('\n'),
                );
            }
            warn(warning);
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            ...extensions.plugins,
            json(),
            ...(await getCompilerPlugin(
                buildEnv,
                enableSupport.typescript,
                sourceDirectory,
                outDirectory,
            )),
            replaceEnv
                ? replace({
                      preventAssignment: true,
                      include: entries,
                      values: {
                          'process.env.BUILD_ENV': JSON.stringify(buildEnv),
                          'process.env.CONFIG_ENV': JSON.stringify(configEnv),
                      },
                  })
                : null,
            copy({
                targets: [
                    { src: 'src/**/*.cjs', dest: 'dist/' },
                    { src: 'src/**/*.graphql', dest: 'dist/' },
                ],
                flatten: false,
            }),
        ],
    });
}
