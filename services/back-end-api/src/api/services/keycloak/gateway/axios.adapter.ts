import axios, { AxiosHeaders } from 'axios';
import type { AxiosInstance } from 'axios';
import { Service } from 'typedi';

export interface HttpClient {
    axiosInstance: AxiosInstance;

    get<T>(url: string): Promise<T>;
    post<T>(url: string, body: object): Promise<T>;
    put<T>(url: string, body: object): Promise<T>;
    delete<T>(url: string): Promise<T>;
}

export interface postResponse<T> {
    header: AxiosHeaders;
    data: T;
}

@Service()
export class AxiosKeycloakAdapter implements HttpClient {
    readonly axiosInstance;

    constructor(readonly baseURL: string = 'https://auth.localhost:8443') {
        this.axiosInstance = axios.create({
            baseURL,
        });
    }

    public defineAuthorizationToken(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    public defineContentType(contentType: string) {
        this.axiosInstance.defaults.headers.common['Content-Type'] = contentType;
    }

    async get<T>(url: string): Promise<T> {
        return this.axiosInstance.get(url);
    }

    async post<T>(url: string, body?: object): Promise<T> {
        return this.axiosInstance.post(url, body);
    }

    async put<T>(url: string, body: object): Promise<T> {
        return this.axiosInstance.put(url, body);
    }

    async delete<T>(url: string): Promise<T> {
        return this.axiosInstance.delete(url);
    }
}
