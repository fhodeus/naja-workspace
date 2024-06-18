import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { config } from '../../config/config';
import { getUser } from '../../modules/main/util/auth';

import type { HttpClient } from './http.client';

export class AxiosAdapter implements HttpClient {
    readonly axiosInstance;

    constructor(readonly baseURL: string) {
        const user = getUser();

        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${user?.access_token ? user.access_token : ''}`,
            },
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const user = getUser();
            config.headers.Authorization = `Bearer ${user?.access_token ? user.access_token : ''}`;

            return config;
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get(url, config);
        return response.data;
    }

    async post<T>(url: string, body?: object): Promise<T> {
        const response = await this.axiosInstance.post(url, body);
        return response.data;
    }

    async put<T>(url: string, body: object): Promise<T> {
        const response = await this.axiosInstance.put(url, body);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete(url);
        return response.data;
    }
}

export const httpClient = new AxiosAdapter(config.API_ENDPOINT);

export default AxiosAdapter;
