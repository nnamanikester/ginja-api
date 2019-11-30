const otpQueries = {};

const otpMutations = {};

const otpTypes = {
    Otp: {
        id: (parent: any) => parent.id,
        code: (parent: any) => parent.code,
        phoneNumber: (parent: any) => parent.phoneNumber
    }
};

export { otpTypes, otpMutations, otpQueries };
