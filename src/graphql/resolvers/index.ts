import { authTypes, authQueries, authMutations } from './auth';
import { listingTypes, listingQueries, listingMutations } from './listing';
import { roleMutations, roleQueries, roleTypes } from './roles';
import { bankMutations, bankQueries, bankTypes } from './bank';
import { userMutations, userQueries, userTypes } from './users';
import { organizationTypes, organizationQueries, organizationMutations } from './organization';
import { otpTypes, otpMutations } from './otp';
import { miscTypes, miscQueries } from './misc';
import { ratingMutations } from './rating';
import { requisitionMutations, requisitionQueries, requisitionTypes } from './requisition';

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
        ...requisitionQueries
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
        ...requisitionMutations
    },
    ...authTypes,
    ...bankTypes,
    ...organizationTypes,
    ...roleTypes,
    ...userTypes,
    ...otpTypes,
    ...listingTypes,
    ...miscTypes,
    ...requisitionTypes
};

export default resolvers;
