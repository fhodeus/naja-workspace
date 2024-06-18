import * as express from 'express';
import { Service } from 'typedi';

import Token from 'keycloak-connect/middleware/auth-utils/token';
import Signature from 'keycloak-connect/middleware/auth-utils/signature';

@Service()
export class AuthService {
    constructor() {}

    public async parseBasicAuthFromRequest(req: express.Request): Promise<any | undefined> {
        const headers = req.headers;
        const tokenRaw = headers?.authorization?.split(' ').slice(-1)[0] as string | undefined;

        if (!tokenRaw) {
            return null;
        }

        const token = new Token(tokenRaw, 'web-back-end-client');

        const signature = new Signature({
            realmUrl: 'https://auth.clinic-pet.app.br/realms/front-end-client',
            publicKey:
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvmJGkvfrxkGMtjavccCkhZe2RND232lU2r9/ct1kKLPCg+9JDL2CHsNQMZjkUka24n+Jr0hIAtSI1SYzmOxVxzK7/ycUU46dgidwdwU4FR1BJQwgwSMiDrzZRqZ3bc3+bffcLkCxg9Mql/hZuWDuV0tIStrvqp3VC9F9nWIgufwKVPAGERK2O56vOFI4wZa124vHqmnQ461/QGEx6lxH9o2+DFf5aIHb/IMt3g6Zl41HIQGyd8q9fOqiId457HuJE2sszD838Ks3zr8fCyoKWv7cNXTehcxOmZ0PU83zUV+1mdUSK+t56yHq8aBbuwv+URglgKC3b13/klhLE6iB/QIDAQAB',
            minTimeBetweenJwksRequests: 0,
        });

        const user = await signature.verify(token, null);

        return user;
    }
}
