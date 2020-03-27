import * as stockService from '../../services/stock';

const createStock = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await stockService.createStock({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const updateStockProduct = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await stockService.updateStockProduct({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const createDispatch = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await stockService.createDispatch({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

const stocks = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await stockService.stocks({ parent, args, context });
    } catch (error) {
        throw error;
    }
};

export { createStock, updateStockProduct, createDispatch, stocks };
