import { Command, flags } from '@oclif/command';
import { spawn } from 'child_process';

// Reference types for export.
import type { flags as _ } from '@oclif/parser';

export default class Build extends Command {
    static description = 'Builds a package using the endeavour common build tools';

    static examples = [
        `$ dragon build library
built ./dist in 5ms
`,
    ];

    static args = [
        {
            name: 'type',
            // TODO: Consider frontend build wrapped through cli?
            options: ['library'],
        },
    ];

    static flags = {
        help: flags.help({ char: 'h' }),
        environment: flags.option({
            description: 'Selects which environment to build for',
            options: ['production', 'development'],
            parse: (input) => input ?? 'development',
        }),
        format: flags.option({
            description: 'Defines the output module format',
            options: ['cjs', 'esm'],
            parse: (input) => input ?? 'esm',
        }),
        watch: flags.boolean({ char: 'w', description: 'Use watch mode' }),
        after: flags.string({
            description: 'Command to run after build successfully completes',
            default: '',
        }),
    };

    async run() {
        const { args, flags } = this.parse(Build);
        const type = args['type'];

        const BuilderConstructor = await this.getBuilder(type);

        if (!BuilderConstructor) {
            this.error(new Error('Unknown project type: ' + type));
        }

        const builder = new BuilderConstructor();
        const options = {
            isProduction: flags.environment === 'production',
            format: flags.format as 'cjs' | 'esm',
        };

        // TODO: Better error/watch handling.
        if (flags.watch) {
            builder.watch(options);
            return;
        }

        try {
            const timeStarted = Date.now();
            this.log('Compilation started');
            try {
                await builder.build(options);
            } catch (e) {
                console.error(e);
            }

            const completionTime = Date.now() - timeStarted;
            this.log('Compilation complete in', completionTime, 'ms');

            if (flags.after) {
                this.log('Running', flags.after);
                const splitArgs = flags.after.split(' ');
                const child = spawn(splitArgs.shift()!, splitArgs, {
                    stdio: 'inherit',
                    env: {
                        ...process.env,
                        NODE_ENV: flags.environment,
                        BUILD_ENV: flags.environment,
                        CONFIG_ENV: flags.environment,
                    },
                    cwd: process.cwd(),
                });

                child.addListener('close', (code) => {
                    process.exit(code ? code : 0);
                });
            }
        } catch (e: unknown) {
            if (!(e instanceof Error)) {
                console.error(e);
                this.error('Unrecoverable Error');
            }

            this.error(e);
        }
    }

    async getBuilder(builder: 'library') {
        // TODO: Add other types of builders if necessary.
        return (await import('@endeavour/library-builder')).LibraryBuilder;
    }
}
