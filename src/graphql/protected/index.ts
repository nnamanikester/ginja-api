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
        acceptTerms: authMiddleware,
        createRole: authMiddleware,
        createOrganizationType: authMiddleware,
        makePaymentToWarehouser: authMiddleware
    }
};

export default permissions;
