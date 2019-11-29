import AuthService from '../integrations/AuthService';

const authService = new AuthService();

const login = async (data: any): Promise<any> => {
    try {
        const auth = await authService.auth.getToken({
            grant_type: data.grant_type,
            client_id: data.client_id,
            client_secret: data.client_secret,
            scope: data.scope || 'read,write'
        });
        return auth;
    } catch (error) {
        throw error;
    }
};

export { login };
