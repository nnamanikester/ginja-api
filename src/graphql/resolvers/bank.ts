import { resolveAccountNumber } from '../controllers/bank';

const bankQueries = {
    banks: (root: any, args: any, context: any, info: any) => {
        return context.prisma.banks();
    }
};

const bankMutations = {
    resolveAccountNumber: (root: any, args: any, context: any) => resolveAccountNumber(root, args, context)
};

const bankTypes = {
    Bank: {
        id: (parent: any) => parent.id,
        accountNumber: (parent: any) => parent.accountNumber,
        bankCode: (parent: any) => parent.bankCode,
        accountName: (parent: any) => parent.accountName,
        bankName: (parent: any) => parent.bankName
    }
};

export { bankTypes, bankMutations, bankQueries };
