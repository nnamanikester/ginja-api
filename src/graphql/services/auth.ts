import AuthService from '../integrations/AuthService';

const authService = new AuthService();

// Create auth
const createAuth = async (graph: any, params: any) => {
    const { parent, args, context } = graph;
    const { user } = params;
    const { prisma } = context;
    const { pin, phoneNumber, email, type } = args;

    try {
        return await prisma.createAuth({
            pin,
            phoneNumber,
            email,
            type: {
                connect: {
                    id: type
                }
            },
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

// Create user
const createUser = async (graph: any, params: any) => {
    const { parent, args, context } = graph;
    const { bank } = params;
    const { prisma } = context;
    const { dob, phoneNumber, email, lastName, firstName, type } = args;

    try {
        return await prisma.createUser({
            firstName,
            phoneNumber,
            email,
            lastName,
            type: {
                connect: {
                    id: type
                }
            },
            dob,
            bank: {
                connect: {
                    id: bank
                }
            }
        });
    } catch (error) {
        throw error;
    }
};

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

export { createAuth, createUser, createRole };
