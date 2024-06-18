import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';

import { env } from '../../env';
import { Service } from 'typedi';

@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    public isProduction = env.isProduction;

    public error(
        error: HttpError,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ): void {
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error[`errors`] || [],
        });
    }
}
