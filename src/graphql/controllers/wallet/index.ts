import * as WalletService from '../../services/wallet';
import { requisitions } from 'src/graphql/services/requisition';

interface Result {
    success: boolean;
}

const makePaymentToWarehouser = async (parent: any, args: any, context: any, info: any): Promise<Result> => {
    try {
        const { prisma } = context;
        const { requisitionId } = args;

        const filter = { id: requisitionId };

        /* prisma dosen't return the user and listing fields in a normal query. 
        Possibly an issue with prisma. This is the reason for the extra queries for both the user and listing */
        const requisition = await prisma.requisition(filter);
        const listing = await prisma.requisition(filter).listing();

        const warehouser = await prisma.listing({ id: listing.id }).user();
        const user = await prisma.requisition(filter).user();
        const cost = await prisma.requisition(filter).cost();

        requisition.user = user;
        requisition.listing = { user: warehouser };
        requisition.cost = cost;

        if (!requisition) {
            throw new Error("Requisition doesn't Exist");
        }

        return await WalletService.makePayment({
            parent,
            args: { requisition },
            context
        });
    } catch (error) {
        throw error;
    }
};

export { makePaymentToWarehouser };
