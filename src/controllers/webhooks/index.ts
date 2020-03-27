import { Request, Response, NextFunction } from 'express';
import * as utilities from '../../core/helpers/utilities';
import * as paymentService from '../../services/payment';

export default {
    paystack: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const {
            body: { event, data }
        } = req;
        const {
            locals: { prisma }
        } = res;

        try {
            switch (event) {
                case 'charge.success':
                    await paymentService.handlePaystackWebhook(data, prisma);
                    res.json(utilities.itemResponse(req.body, 'login successfull'));
                    break;
                default:
                    res.json(utilities.itemResponse(req.body, 'login successfull'));
            }
        } catch (error) {
            next(error);
        }
    }
};
