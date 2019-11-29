import { authTypes, authQueries, authMutations } from './auth';

const resolvers = {
    Query: {
        info: () => `This is the API of a Ginjabox`,
        ...authQueries
    },
    Mutation: {
        ...authMutations
    },
    ...authTypes
};

export default resolvers;
