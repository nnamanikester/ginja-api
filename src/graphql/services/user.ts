// Create user
const createUser = async (graph: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { dob, phoneNumber, email, lastName, firstName, type } = args;

    try {
        return await prisma.createUser({
            firstName,
            phoneNumber,
            email,
            lastName,
            dob
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

export { createUser, checkUser };
