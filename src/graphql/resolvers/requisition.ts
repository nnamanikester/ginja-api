import { createRequisition, requisitions, changeRequisitionStatus } from '../../controllers/requisition';

const requisitionQueries = {
    requisitions: (root: any, args: any, context: any, info: any) => requisitions(root, args, context)
};

const requisitionMutations = {
    changeRequisitionStatus: (root: any, args: any, context: any) => changeRequisitionStatus(root, args, context),
    createRequisition: (root: any, args: any, context: any) => createRequisition(root, args, context)
};

const requisitionTypes = {
    Requisition: {
        id: (parent: any) => parent.id,
        space: (parent: any) => parent.space,
        expires: (parent: any) => parent.expires,
        duration: (parent: any, args: any, context: any) => context.prisma.requisition({ id: parent.id }).duration(),
        cost: (parent: any, args: any, context: any) => context.prisma.requisition({ id: parent.id }).cost(),
        user: (parent: any, args: any, context: any) => context.prisma.requisition({ id: parent.id }).user(),
        products: (parent: any, args: any, context: any) => context.prisma.requisition({ id: parent.id }).products(),
        listing: (parent: any, args: any, context: any) => context.prisma.requisition({ id: parent.id }).listing()
    }
};

export { requisitionTypes, requisitionQueries, requisitionMutations };
