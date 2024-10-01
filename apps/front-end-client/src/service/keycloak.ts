import KeycloakAdminClient from '@endeavour/keycloak-sdk';

class KeycloakClientClass extends KeycloakAdminClient {
    constructor(protected username: string, protected password: string) {
        super({
            baseUrl: 'https://auth.clinic-pet.app.br',
        });

        this.auth({
            username: this.username,
            password: this.password,
            grantType: 'password',
            clientId: 'admin-cli',
        });
    }
}

export const KeycloakClient = new KeycloakClientClass('admin', 'admin');

