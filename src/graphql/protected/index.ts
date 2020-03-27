import authMiddleware from '../../core/middlewares/validateToken';

const permissions = {
    Query: {
        banks: authMiddleware,
        users: authMiddleware,
        auths: authMiddleware,
        roles: authMiddleware,
        role: authMiddleware,
        organizations: authMiddleware,
        listings: authMiddleware,
        payments: authMiddleware,
        stocks: authMiddleware,
        userOrganizationRoles: authMiddleware,
        requisitions: authMiddleware
    },
    Mutation: {
        acceptTerms: authMiddleware,
        createRole: authMiddleware,
        createOrganizationType: authMiddleware,
        changeRequisitionStatus: authMiddleware,
        submitRating: authMiddleware,
        addListing: authMiddleware,
        createRequisition: authMiddleware,
        createStock: authMiddleware,
        createDispatch: authMiddleware,
        initializePayment: authMiddleware,
        verifyPayment: authMiddleware
    }
};

export default permissions;
