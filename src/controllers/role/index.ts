import { UserModel } from '../../interfaces/auth';
import * as roleService from '../../services/role';

const createRole = async (parent: any, args: UserModel, context: any): Promise<any> => {
    try {
        return await roleService.createRole({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const getRoleByParam = async (parent: any, args: UserModel, context: any): Promise<any> => {
    try {
        return await roleService.getRoleByParam({ parent, args, context }, { args });
    } catch (error) {
        throw error;
    }
};

export { createRole, getRoleByParam };
