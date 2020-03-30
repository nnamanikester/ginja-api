/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

const createTransaction = async (graph: any) => {
    try {
        const {
            args: { description = '', user, type, amount, to },
            context: { prisma }
        } = graph;

        const result = await prisma.createTransaction({
            type,
            description,
            amount,
            to: {
                connect: {
                    id: to
                }
            },
            user: {
                connect: {
                    id: user
                }
            }
        });

        return result;
    } catch (error) {
        throw error;
    }
};

const updateTransaction = (graph: any, params: any) => {};

export { createTransaction, updateTransaction };
