import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { AuthService } from './AuthService';
import { Logger } from '../lib/logger';

export function currentUserChecker(): (action: Action) => Promise<any | undefined> {
    const authService = Container.get<AuthService>(AuthService);
    const log = new Logger(__filename);

    return async function innerCurrentUserChecker(action: Action): Promise<any | undefined> {
        const headers = action.request.headers;

        if (!headers.authorization) {
            log.warn('NO credentials given to check current User');
            return undefined;
        }

        const user = await authService.parseBasicAuthFromRequest(action.request);

        if (!user) {
            log.warn('Invalid credentials given to check current User');
            return undefined;
        }

        log.info('Successfully checked current User');
        return user;
    };
}
