/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Create Requisition

const createRequisition = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { duration, cost, user, listing, expires, products, space } = args;
    try {
        const result = await prisma.createRequisition({
            duration: {
                connect: duration
            },
            cost: {
                create: cost
            },
            user: {
                connect: { id: user }
            },
            listing: {
                connect: { id: listing }
            },
            expires,
            products: {
                connect: products
            },
            space,
            status: 0
        });
        if (result) return { success: true };
        return { success: false };
    } catch (error) {
        throw error;
    }
};

const requisitions = async (graph: any) => {

    const { args, context } = graph;
    const { prisma } = context;
    const { first, skip, user, limit, nextToken, listing } = args;
    const filterbyUser = user ? { user: { id: user } } : {};
    const filterbyListing = listing ? { listing: { id: listing } } : {};

    const where =
        {
            ...filterbyUser,
            ...filterbyListing
        } || {};
    const skipQuery = skip ? { skip } : {};
    const firstQuery = first ? { first } : {};
    const QueryParams = {
        ...skipQuery,
        ...firstQuery
    };

    try {
        return await prisma.requisitions({
            where,
            ...QueryParams
        });
    } catch (error) {
        throw error;
    }
};

export { createRequisition, requisitions };
