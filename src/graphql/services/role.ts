// Create Role
const createRole = async (graph: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { name } = args;

    try {
        return await prisma.createRole({
            name
        });
    } catch (error) {
        throw error;
    }
};

// Get Role by Name
const getRoleByParam = async (graph: any, params: any) => {
    const {
        parent,
        args,
        context: { prisma }
    } = graph;

    try {
        const role = await prisma.role(params);
        return role;
    } catch (error) {
        throw error;
    }
};

export { createRole, getRoleByParam };
