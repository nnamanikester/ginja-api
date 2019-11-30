import * as otpService from '../../services/otp';

const generateOtp = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await otpService.generateOtp({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const validateOtp = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await otpService.validateOtp({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { generateOtp, validateOtp };
