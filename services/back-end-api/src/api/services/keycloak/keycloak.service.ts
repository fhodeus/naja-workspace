import { Inject, Service } from 'typedi';
import { JWT_SECRET_PASSWORD, JWT_SECRET_USERNAME } from '../../../loaders/keycloakConnectLoader';
import { KeycloakAdminClient } from '@endeavour/keycloak-sdk';

@Service()
export class KeycloakClient extends KeycloakAdminClient {
    constructor(
        @Inject(JWT_SECRET_USERNAME)
        protected username: string,
        @Inject(JWT_SECRET_PASSWORD)
        protected password: string,
    ) {
        super();

        this.auth({
            username: this.username,
            password: this.password,
            grantType: 'password',
            clientId: 'admin-cli',
        });
    }
}
