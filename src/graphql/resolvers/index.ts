import { authTypes, authQueries, authMutations } from './auth';
import { listingTypes, listingQueries, listingMutations } from './listing';
import { roleMutations, roleQueries, roleTypes } from './roles';
import { bankMutations, bankQueries, bankTypes } from './bank';
import { userMutations, userQueries, userTypes } from './users';
import { organizationTypes, organizationQueries, organizationMutations } from './organization';
import { stockMutations, stockQueries, stockTypes } from './stock';
import { requisitionTypes, requisitionQueries, requisitionMutations } from './requisition';
import { otpTypes, otpMutations } from './otp';
import { miscTypes, miscQueries } from './misc';
import { ratingMutations } from './rating';
import { walletMutations, walletQueries, walletTypes } from './wallet';
import { chatMutations, chatQueries, chatSubscriptions, chatTypes } from './chats';

const resolvers = {
    Query: {
        info: () => `This is the API of a Ginjabox`,
        ...authQueries,
        ...listingQueries,
        ...roleQueries,
        ...bankQueries,
        ...organizationQueries,
        ...userQueries,
        ...miscQueries,
        ...requisitionQueries,
        ...stockQueries,
        ...walletQueries,
        ...chatQueries
    },
    Mutation: {
        ...authMutations,
        ...roleMutations,
        ...bankMutations,
        ...organizationMutations,
        ...userMutations,
        ...otpMutations,
        ...listingMutations,
        ...ratingMutations,
        ...requisitionMutations,
        ...stockMutations,
        ...walletMutations,
        ...chatMutations
    },
    Subscription: {
        ...chatSubscriptions
    },
    ...authTypes,
    ...bankTypes,
    ...organizationTypes,
    ...roleTypes,
    ...userTypes,
    ...otpTypes,
    ...listingTypes,
    ...miscTypes,
    ...requisitionTypes,
    ...stockTypes,
    ...walletTypes
};

export default resolvers;
