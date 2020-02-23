import * as requisitionService from '../../services/requisition';

const createRequisition = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await requisitionService.createRequisition({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const requisitions = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await requisitionService.requisitions({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { createRequisition, requisitions };
