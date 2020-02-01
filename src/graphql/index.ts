import resolvers from './resolvers';
import permissions from './protected';
import { prisma } from '../core/prisma/generated';

const { GraphQLServer } = require('graphql-yoga');

const logResult = async (resolve: (arg0: any, arg1: any, arg2: any, arg3: any) => any, root: any, args: any, context: any, info: any) => {
    console.log(`2. logResult`);
    const result = await resolve(root, args, context, info);
    console.log(`4. logResult: ${JSON.stringify(result)}`);
    return result;
};

const graphServer = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers,
    middlewares: [permissions, logResult],
    context: (request: any) => {
        return {
            ...request,
            prisma
        };
    }
});

export default graphServer;
