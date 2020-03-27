import { verifyPayment, initializePayment } from '../../controllers/payment';

const paymentQueries = {
    payments: (root: any, args: any, context: any, info: any) => {
        return context.prisma.payments();
    }
};

const paymentMutations = {
    verifyPayment: (root: any, args: any, context: any) => verifyPayment(root, args, context),
    initializePayment: (root: any, args: any, context: any) => initializePayment(root, args, context)
};

const paymentTypes = {
    Payment: {
        id: (parent: any) => parent.id,
        amount: (parent: any) => parent.amount,
        email: (parent: any) => parent.email,
        status: (parent: any) => parent.status,
        channel: (parent: any) => parent.channel,
        currency: (parent: any) => parent.currency,
        info: (parent: any) => parent.info,
        requisition: (parent: any, args: any, context: any) => context.prisma.payment({ id: parent.id }).requisition()
    }
};

export { paymentTypes, paymentMutations, paymentQueries };
