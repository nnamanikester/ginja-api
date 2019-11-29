import resolvers from './resolvers';
import { prisma } from '../core/prisma/generated';

const { GraphQLServer } = require('graphql-yoga');

const graphServer = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    context: { prisma }
});

export default graphServer;
