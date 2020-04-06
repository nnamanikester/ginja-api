/* eslint-disable @typescript-eslint/explicit-function-return-type */
const createStaff = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { phoneNumber, email, lastName, firstName, roleId, password } = args;

    try {
        return await prisma.createAdminUser({
            firstName,
            phoneNumber,
            email,
            lastName,
            roleId,
            password
        });
    } catch (error) {
        throw error;
    }
};

const checkStaff = async (graph: any, params: any) => {
    const {
        context: { prisma }
    } = graph;

    try {
        return await prisma.adminUser(params);
    } catch (error) {
        throw error;
    }
};

const allStaff = async (prisma: any) => {
    // const {
    //     context: { prisma }
    // } = graph;

    try {
        return await prisma.adminUsers();
    } catch (error) {
        throw error;
    }
};

export { createStaff, checkStaff, allStaff };
