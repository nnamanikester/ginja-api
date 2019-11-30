import { validateOtp, generateOtp } from '../controllers/otp';

const otpQueries = {
    otp: (root: any, args: any, context: any, info: any) => {
        return context.prisma.otp();
    }
};

const otpMutations = {
    generateOtp: (root: any, args: any, context: any) => generateOtp(root, args, context),
    validateOtp: (root: any, args: any, context: any) => validateOtp(root, args, context)
};

const otpTypes = {
    Otp: {
        id: (parent: any) => parent.id,
        code: (parent: any) => parent.code,
        phoneNumber: (parent: any) => parent.phoneNumber,
        validated: (parent: any) => parent.validated
    }
};

export { otpTypes, otpMutations, otpQueries };
