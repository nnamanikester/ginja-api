import { makePaymentToWarehouser } from '../controllers/wallet';
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const walletQueries = {};

const walletMutations = {
    makePaymentToWarehouser: (root: any, args: any, context: any, info: any): Promise<any> =>
        makePaymentToWarehouser(root, args, context, info)
};

const walletTypes = {
    Wallet: {
        id: (parent: any) => parent.id,
        userId: (parent: any) => parent.userId,
        owner: (parent: any, args: any, context: any) => context.prisma.wallet({ id: parent.id }).owner(),
        availableBalance: (parent: any) => parent.balance,
        ledgerBalance: (parent: any) => parent.balance,
        transactions: (parent: any, args: any, context: any) => context.prisma.wallet({ id: parent.id }).transactions(),
        bank: (parent: any, args: any, context: any) => context.prisma.wallet({ id: parent.id }).bank()
    }
};

export { walletQueries, walletMutations, walletTypes };
