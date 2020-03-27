import * as PaymentService from '../../services/payment';

const initializePayment = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await PaymentService.initializePayment({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const verifyPayment = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await PaymentService.verifyPayment({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { verifyPayment, initializePayment };
