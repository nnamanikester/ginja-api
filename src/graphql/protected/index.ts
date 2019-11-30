import authMiddleware from '../../core/middlewares/validateToken';

const permissions = {
    Query: {
        banks: authMiddleware,
        users: authMiddleware,
        auths: authMiddleware,
        roles: authMiddleware,
        role: authMiddleware,
        organizations: authMiddleware
    },
    Mutation: {
        createRole: authMiddleware,
        createOrganizationType: authMiddleware
    }
};

export default permissions;
