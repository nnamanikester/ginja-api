import { userModel } from '../../interfaces/auth';
import * as authService from '../../services/auth';
import * as bankService from '../../services/bank';

const createUser = async (parent: any, args: userModel, context: any): Promise<any> => {
    try {
        // Create Bank Object
        const { id: bank } = await bankService.createBank({ parent, args, context });

        // Create user
        const { id: user } = await authService.createUser({ parent, args, context }, { bank });

        // Create auth
        const auth = await authService.createAuth({ parent, args, context }, { user });
        return auth;
    } catch (error) {
        throw error;
    }
};

const createRole = async (parent: any, args: userModel, context: any): Promise<any> => {
    try {
        return await authService.createRole({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { createUser, createRole };
