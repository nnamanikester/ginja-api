// Create Bank
const createOrganization = async (graph: any, params: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { firstName, lastName, email, phoneNumber, type } = args;

    const { bank } = params;

    try {
        return await prisma.createOrganization({
            name: `${firstName} ${lastName}`,
            email,
            phoneNumber,
            bank: {
                connect: {
                    id: bank
                }
            },
            type: {
                connect: {
                    id: type
                }
            }
        });
    } catch (error) {
        throw error;
    }
};

// Create User Organization Roles
const createUserOrganizationRoles = async (graph: any, params: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { user, role, organization } = params;
    try {
        return await prisma.createUserOrganizationRole({
            user: {
                connect: {
                    id: user
                }
            },
            role: {
                connect: {
                    id: role
                }
            },
            organization: {
                connect: {
                    id: organization
                }
            }
        });
    } catch (error) {
        throw error;
    }
};

// Create Organization Type
const createOrganizationType = async (graph: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { name } = args;
    try {
        return await prisma.createOrganizationType({
            name
        });
    } catch (error) {
        throw error;
    }
};

export { createOrganization, createUserOrganizationRoles, createOrganizationType };
