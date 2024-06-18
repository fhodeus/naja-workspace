import { createConfiguration } from './src';

/**
 * Note: This is the configuration to build the configuration.
 *
 * Effectively it is preprocessed by esbuild to be able to use itself as its
 * own configuration.
 */
export default createConfiguration({
    entries: './src/*.ts',
    outDirectory: './dist',
    outFormat: 'cjs',
    replaceEnv: false,
});
