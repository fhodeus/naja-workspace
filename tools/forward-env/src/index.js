#!node
const { spawn } = require('child_process');

const args = process.argv;

const AFTER_FLAG = '--after';
const afterFlagPosition = args.findIndex((/** @type {string} **/ name) => {
    return name.toLowerCase().startsWith(AFTER_FLAG);
});

const environmentFlagPosition = args.findIndex((/** @type {string} **/ name) => {
    return name.toLowerCase() === '--environment';
});

const valuePosition = environmentFlagPosition + 1;
const hasEnvironment = environmentFlagPosition !== -1 && args.length > valuePosition;
const environment = hasEnvironment ? args[valuePosition] : 'development';

if (hasEnvironment) {
    args.splice(environmentFlagPosition, 2);
}

const afterValue =
    afterFlagPosition !== -1
        ? args[afterFlagPosition].replace(/["']/g, '').slice(AFTER_FLAG.length + 1)
        : null;

if (afterFlagPosition !== -1) {
    args.splice(afterFlagPosition, 1);
}

// Remove `node ./forward-env.js`
args.splice(0, 2);

spawn(/** @var {string} */ args.shift(), args, {
    stdio: 'inherit',
    env: {
        ...process.env,
        NODE_ENV: environment,
        BUILD_ENV: environment,
        CONFIG_ENV: environment,
    },
    cwd: process.cwd(),
}).on('exit', () => {
    if (afterValue) {
        const [command, ...commandArgs] = afterValue.split(' ');
        const checkType = spawn(command, commandArgs, {
            stdio: 'pipe',
            env: process.env,
            cwd: process.cwd(),
        });

        checkType.on('error', (error) => {
            console.error(error);
            process.exit(1);
        });

        checkType.on('exit', (status) => {
            if (status !== 0) {
                process.exit(1);
            }
        });

        checkType.stdout.pipe(process.stdout);
        checkType.stderr.pipe(process.stderr);
    }
});
