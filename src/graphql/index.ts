import { GraphQLServer } from 'graphql-yoga';

import resolvers from './resolvers';
import permissions from './protected';
import logger from './logger';
import { prisma } from '../core/prisma/generated';

const graphServer = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    middlewares: [permissions, logger],
    context: (request: any) => {
        return {
            ...request,
            prisma
        };
    }
});

export default graphServer;
