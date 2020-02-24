import { createStock, updateStockProduct, createDispatch, stocks } from '../controllers/stock';

const stockQueries = {
    stocks: (root: any, args: any, context: any, info: any) => stocks(root, args, context)
};

const stockMutations = {
    // updateStockProduct: (root: any, args: any, context: any) => updateStockProduct(root, args, context),
    createStock: (root: any, args: any, context: any) => createStock(root, args, context),
    createDispatch: (root: any, args: any, context: any) => createDispatch(root, args, context)
};

const stockTypes = {
    Stock: {
        id: (parent: any) => parent.id,
        type: (parent: any) => parent.type,
        products: (parent: any, args: any, context: any) => context.prisma.stock({ id: parent.id }).products(),
        status: (parent: any) => parent.status,
        dispatch: (parent: any, args: any, context: any) => context.prisma.stock({ id: parent.id }).dispatch(),
        requisition: (parent: any, args: any, context: any) => context.prisma.stock({ id: parent.id }).requisition()
    }
};

export { stockQueries, stockMutations, stockTypes };
