import * as bankService from '../../services/bank';

const resolveAccountNumber = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await bankService.resolveAccountNumber({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { resolveAccountNumber };
