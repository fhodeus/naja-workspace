import * as express from 'express';
import { Service } from 'typedi';

import Token from 'keycloak-connect/middleware/auth-utils/token';
import Signature from 'keycloak-connect/middleware/auth-utils/signature';

import { env } from '../env';

@Service()
export class AuthService {
    constructor() {}

    public async parseBasicAuthFromRequest(req: express.Request): Promise<any | undefined> {
        const headers = req.headers;
        const tokenRaw = headers?.authorization?.split(' ').slice(-1)[0] as string | undefined;

        if (!tokenRaw) {
            return null;
        }

        const token = new Token(tokenRaw, env.auth.clientId);

        const signature = new Signature({
            realmUrl: `${env.auth.schema}://${env.auth.host}:${env.auth.port}/realms/${env.auth.realm}`,
            publicKey: env.auth.publicKey,
            minTimeBetweenJwksRequests: 0,
        });

        const user = await signature.verify(token, null);

        return user;
    }
}
