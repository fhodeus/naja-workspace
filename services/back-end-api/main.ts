import 'reflect-metadata';

import { bootstrapMicroframework } from 'microframework-w3tec';

import { banner } from './src/lib/banner';
import { Logger } from './src/lib/logger';
import { expressLoader } from './src/loaders/express-loader';
import { winstonLoader } from './src/loaders/winstonLoader';
import { homeLoader } from './src/loaders/homeLoader';
import { typeormLoader } from './src/loaders/typeormLoader';
import { iocLoader } from './src/loaders/iocLoader';
import { monitorLoader } from './src/loaders/monitorLoader';
import { notificationLoader } from './src/loaders/notification-loader';

/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new Logger(__filename);

bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader,
        iocLoader,
        typeormLoader,
        expressLoader,
        notificationLoader,
        monitorLoader,
        homeLoader,
      
    ],
})
    .then(() => banner(log))
    .catch((error) => log.error('Application is crashed: ' + error));
