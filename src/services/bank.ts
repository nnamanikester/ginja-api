import Payment from '../integrations/Payment';

const payment = new Payment();

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

// Resolve Account Number
const resolveAccountNumber = async (graph: any) => {
    const { args } = graph;
    const { bankCode, accountNumber } = args;

    try {
        const {
            body: {
                data: { account_name: accountName }
            }
        } = await payment.paystack.resolveAccountNumber({
            bankCode,
            accountNumber
        });
        return { accountName };
    } catch (error) {
        throw error;
    }
};

export { createBank, resolveAccountNumber };
