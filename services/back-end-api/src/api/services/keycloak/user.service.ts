import { Service } from 'typedi';
import { AxiosKeycloakAdapter } from './gateway/axios.adapter';

export interface UserCreateBody {
    username: string;
    enabled: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    credentials: [
        {
            type: 'password';
            value: string;
            temporary: boolean;
        },
    ];
    groups: [];
    attributes?: Record<string, string | number>;
}

@Service()
export class CustomerKeycloakService {
    constructor(private httpClient: AxiosKeycloakAdapter) {}

    async authenticateService(): Promise<any> {
        this.httpClient.defineContentType('application/x-www-form-urlencoded');

        const response = await this.httpClient.post<any>(
            '/realms/master/protocol/openid-connect/token',
            {
                username: 'admin',
                password: 'password',
                client_id: 'admin-cli',
                grant_type: 'password',
            },
        );
      
        this.httpClient.defineAuthorizationToken(response.data.access_token);
    }

    async createUser(config: { payload: UserCreateBody }): Promise<any> {
        await this.authenticateService();

        this.httpClient.defineContentType('application/json;charset=UTF-8');
        const response = await this.httpClient.post<any>(
            '/admin/realms/front-end-client/users',
            config.payload,
        );
       
        return response;
    }
}
