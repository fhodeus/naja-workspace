import type { AxiosInstance } from 'axios';

export interface HttpClient {
    axiosInstance: AxiosInstance;

    get<T>(url: string): Promise<T>;
    post<T>(url: string, body: object): Promise<T>;
    put<T>(url: string, body: object): Promise<T>;
    delete<T>(url: string): Promise<T>;
}

export default HttpClient;
