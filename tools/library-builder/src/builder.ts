import { rollup, watch } from 'rollup';
import { Environment, createConfiguration } from './config.js';

interface IBuildOptions {
    isProduction: boolean;
    format?: 'esm' | 'cjs';
}

export class LibraryBuilder {
    async build(options: IBuildOptions) {
        const config = await this.getConfiguration(options);
        const bundle = await rollup(config);

        if (!config.output) {
            throw new Error('Build failed');
        }

        const outputOptions = Array.isArray(config.output) ? config.output : [config.output];
        for (const output of outputOptions) {
            await bundle.generate(output);
            await bundle.write(output);
        }
    }

    async watch(options: IBuildOptions) {
        const watcher = watch(await this.getConfiguration(options));
        let startTime = Date.now();

        watcher.on('event', (event: any) => {
            switch (event.code) {
                case 'FATAL':
                    watcher.removeAllListeners();
                    watcher.close();
                    console.error(event);
                    break;

                case 'ERROR':
                    console.error(`${event?.error} \n\n ${event?.error?.id}`);
                    break;

                case 'START':
                    startTime = Date.now();
                    console.log('Starting compilation');
                    break;

                case 'END':
                    const totalTime = Date.now() - startTime;
                    console.log('Compilation complete in', totalTime, 'ms');
                    break;
            }
        });
    }

    private getConfiguration(options: IBuildOptions) {
        return createConfiguration({
            outFormat: options.format,
            buildEnv: options.isProduction ? Environment.PRODUCTION : Environment.DEVELOPMENT,
        });
    }
}
