// Create auth
const createAuth = async (graph: any, params: any) => {
    const { parent, args, context } = graph;
    const { user } = params;
    const { prisma } = context;
    const { pin, phoneNumber, email } = args;

    try {
        return await prisma.createAuth({
            pin,
            phoneNumber,
            email,
            userId: user,
            user: {
                connect: {
                    id: user
                }
            }
        });
    } catch (error) {
        throw error;
    }
};

const checkAuth = async (graph: any, params: any) => {
    const {
        context: { prisma }
    } = graph;

    try {
        return await prisma.auth(params);
    } catch (error) {
        throw error;
    }
};

export { createAuth, checkAuth };
