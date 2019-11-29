import HttpClient from '../../../core/utils/client';
import serviceConfig from '../../../core/config/services';
import * as utilityService from '../../../core/helpers/utilities';
import logger from '../../../core/utils/logger';

const authServiceConfig = serviceConfig.auth;

export default class Auth {
    private client = new HttpClient({
        baseUrl: `${authServiceConfig.base_url}/`
    });

    public getToken = async (params: object): Promise<any> => {
        try {
            const body = await utilityService.validate(params, {
                grant_type: 'string',
                client_id: 'required|numeric',
                client_secret: 'required|string'
            });
            const response = await this.client.post('/api/oauth/token', body, {
                headers: {
                    Authorization: ''
                }
            });
            logger.info('get token', response.data);
            return response.data;
        } catch (error) {
            logger.error('get token', error);
            throw error;
        }
    };
}
