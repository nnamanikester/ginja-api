import authMiddleware from '../../core/middlewares/validateToken';

const permissions = {
    Query: {
        banks: authMiddleware,
        users: authMiddleware,
        auths: authMiddleware,
        roles: authMiddleware,
        role: authMiddleware,
        organizations: authMiddleware,
        chats: authMiddleware,
        chatMessages: authMiddleware
    },
    Mutation: {
        acceptTerms: authMiddleware,
        createRole: authMiddleware,
        createOrganizationType: authMiddleware,
        makePaymentToWarehouser: authMiddleware,
        addMessage: authMiddleware,
        fundWallet: authMiddleware
    }
};

export default permissions;
