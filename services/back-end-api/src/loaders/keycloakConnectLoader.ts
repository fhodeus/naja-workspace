import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Container, { Token } from 'typedi';

export const JWT_SECRET_USERNAME = new Token<string>('admin');
export const JWT_SECRET_PASSWORD = new Token<string>('password');

export const keycloakConnectLoader: MicroframeworkLoader = async (
    _settings: MicroframeworkSettings | undefined,
) => {
    Container.set(JWT_SECRET_USERNAME, 'username-secure-encryption');
    Container.set(JWT_SECRET_PASSWORD, 'password-secure-encryption');
};
