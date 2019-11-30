import { userModel } from '../../interfaces/auth';
import * as organizationService from '../../services/organization';

const createOrganizationType = async (parent: any, args: userModel, context: any): Promise<any> => {
    try {
        return await organizationService.createOrganizationType({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { createOrganizationType };
