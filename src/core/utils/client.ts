import axios from 'axios';
import https from 'https';
import logger from './logger';
import { ServiceUnavailableError } from '../errors';

interface Props {
    baseUrl: string;
    timeout?: number;
    headers?: object;
    httpsAgent?: https.Agent;
}

export default class Client {
    public instance: any;

    public constructor({ baseUrl, timeout, ...rest }: Props) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: timeout || 5000,
            headers: { Accept: 'application/json' },
            ...rest
        });
        this.instance.interceptors.response.use(
            (response: any): any => {
                logger.info(`Response: ${response.config.method} ${(response.config.url, response.status)}`);
                return response;
            },
            (error: any): any => {
                if (!error.response) {
                    logger.error('Response: Network Error');
                } else {
                    logger.error(`${error.response} Response error`);
                }

                if (error.code === 'ECONNABORTED') {
                    logger.error('Response: ECONNABORTED, timed out.');
                    throw new ServiceUnavailableError('service currently unavailable.');
                }

                return Promise.reject(error);
            }
        );
    }

    public get = async (path: string, config: object = {}): Promise<any> => {
        try {
            const response = await this.instance.get(path, config);
            return response;
        } catch (error) {
            throw error;
        }
    };

    public post = async (path: string, data: object | string, config: object = {}): Promise<any> => {
        try {
            const response = await this.instance.post(path, data, config);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    public put = async (path: string, data: object, config: object = {}): Promise<any> => {
        try {
            const response = await this.instance.put(path, data, config);
            return response;
        } catch (error) {
            throw error;
        }
    };

    public patch = async (path: string, data: object, config: object = {}): Promise<any> => {
        try {
            const response = await this.instance.patch(path, data, config);
            return response;
        } catch (error) {
            throw error;
        }
    };

    public delete = async (path: string, config: object = {}): Promise<any> => {
        try {
            const response = await this.instance.delete(path, config);
            return response;
        } catch (error) {
            throw error;
        }
    };
}
