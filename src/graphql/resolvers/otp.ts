import { createUser, createRole } from '../controllers/auth';

const otpQueries = {
    otp: (root: any, args: any, context: any, info: any) => {
        return context.prisma.users();
    }
};

const otpMutations = {
    createOtp: (root: any, args: any, context: any) => createUser(root, args, context)
};

const otpTypes = {
    Otp: {
        id: (parent: any) => parent.id,
        code: (parent: any) => parent.code,
        phoneNumber: (parent: any) => parent.phoneNumber
    }
};

export { otpTypes, otpMutations, otpQueries };
