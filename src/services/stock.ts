/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Create Stock

const createStock = async (graph: any) => {
    const { context, args } = graph;
    const { prisma } = context;
    const { products, requisition, type } = args;
    try {
        const result = await prisma.createStock({
            products: {
                create: products
            },
            requisition: {
                connect: {
                    id: requisition
                }
            },
            dispatch: {
                create: {
                    status: 0
                }
            },
            type,
            status: 0
        });
        if (result) {
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        throw error;
    }
};

// Create Dispatch
const createDispatch = async (graph: any) => {
    const { context, args } = graph;
    const { prisma } = context;
    const {
        id,
        dispatch: { pickupAgentName, pickupAgentPhone, pickupAgentIdentification, pickupAgentIdNumber, pickupDateMin, pickupDateMax }
    } = args;
    try {
        const result = await prisma.updateStock({
            where: { id },
            data: {
                dispatch: {
                    update: {
                        pickupAgentName,
                        pickupAgentPhone,
                        pickupAgentIdentification,
                        pickupAgentIdNumber,
                        pickupDateMin,
                        pickupDateMax
                    }
                }
            }
        });
        if (result) {
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        throw error;
    }
};

// Update Stock Product
const updateStockProduct = async (graph: any) => {
    const { context, args } = graph;
    const { prisma } = context;
    const { id, products } = args;
    try {
        let type;
        if (products.length > 0) {
            type = 1;
        } else {
            type = 2;
        }
        const result = await prisma.updateStock({
            where: { id },
            data: {
                // products: {
                //     update: products
                // },
                type
            }
        });
        if (result) {
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        throw error;
    }
};

// Get requisition Stocks
const stocks = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { first, skip, merchant, warehouser, status } = args;

    const filterByMerchant = merchant
        ? {
            requisition: {
                user: {
                    id: merchant
                }
            }
        }
        : {};

    const filterByWarehouser = warehouser
        ? {
            requisition: {
                listing: {
                    user: {
                        id: warehouser
                    }
                }
            }
        }
        : {};

    const filterByStatus = status
        ? {
            status
        }
        : {};

    const where =
        {
            ...filterByMerchant,
            ...filterByWarehouser,
            ...filterByStatus
        } || {};

    const skipQuery = skip ? { skip } : {};
    const firstQuery = first ? { first } : {};
    const QueryParams = {
        ...skipQuery,
        ...firstQuery
    };
    try {
        return await prisma.stocks({
            where,
            ...QueryParams
        });
    } catch (error) {
        throw error;
    }
};

export { createStock, createDispatch, updateStockProduct, stocks };
