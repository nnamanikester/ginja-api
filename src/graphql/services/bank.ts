// Create Bank
const createBank = async (graph: any) => {
    const { parent, args, context } = graph;
    const { prisma } = context;
    const { bankName, accountName, bankCode, accountNumber } = args;

    try {
        return await prisma.createBank({
            bankName,
            accountName,
            bankCode,
            accountNumber
        });
    } catch (error) {
        throw error;
    }
};

export { createBank };
