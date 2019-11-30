import { authTypes, authQueries, authMutations } from './auth';
import { roleMutations, roleQueries, roleTypes } from './roles';
import { bankMutations, bankQueries, bankTypes } from './bank';
import { userMutations, userQueries, userTypes } from './users';
import { organizationTypes, organizationQueries, organizationMutations } from './organization';
import { otpTypes, otpMutations } from './otp';

const resolvers = {
    Query: {
        info: () => `This is the API of a Ginjabox`,
        ...authQueries,
        ...roleQueries,
        ...bankQueries,
        ...organizationQueries,
        ...userQueries
    },
    Mutation: {
        ...authMutations,
        ...roleMutations,
        ...bankMutations,
        ...organizationMutations,
        ...userMutations,
        ...otpMutations
    },
    ...authTypes,
    ...bankTypes,
    ...organizationTypes,
    ...roleTypes,
    ...userTypes,
    ...otpTypes
};

export default resolvers;
