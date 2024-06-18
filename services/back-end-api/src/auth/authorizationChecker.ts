import { Action } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(): (
    action: Action,
    roles: any[],
) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(
        action: Action,
        _roles: string[],
    ): Promise<boolean> {
        const headers = action.request.headers;

        if (!headers.authorization) {
            log.warn('NO credentials given to authorization');
            return undefined;
        }

        const user = await authService.parseBasicAuthFromRequest(action.request);

        if (!user) {
            log.warn('Invalid credentials given');
            return false;
        }

        log.info('Successfully checked credentials');
        return !!user;
    };
}
