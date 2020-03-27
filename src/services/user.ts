/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Create user
const createUser = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { dob, phoneNumber, email, lastName, firstName, type } = args;
    try {
        return await prisma.createUser({
            firstName,
            phoneNumber,
            email,
            lastName,
            dob,
            terms: false,
            type
        });
    } catch (error) {
        throw error;
    }
};

const acceptTerms = async (graph: any, params: any) => {
    const { context } = graph;
    const { prisma } = context;
    const { id } = params;
    try {
        return await prisma.updateUser({
            data: {
                terms: true
            },
            where: {
                id
            }
        });
    } catch (error) {
        throw error;
    }
};

const checkUser = async (graph: any, params: any) => {
    const {
        context: { prisma }
    } = graph;

    try {
        return await prisma.user(params);
    } catch (error) {
        throw error;
    }
};

export { createUser, checkUser, acceptTerms };
