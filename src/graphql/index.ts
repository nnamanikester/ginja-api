import resolvers from './resolvers';
import permissions from './protected';
import { prisma } from '../core/prisma/generated';

const { GraphQLServer } = require('graphql-yoga');

const graphServer = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: (request: any) => {
        return {
            ...request,
            prisma
        };
    }
});

export default graphServer;
