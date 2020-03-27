import { Request, Response, NextFunction } from 'express';
import { NotAuthenticatedError } from '../errors';
import paystackHash from '../utils/validatePaystack';
import { prisma } from '../prisma/generated';

const handlePaystackAuth = (req: Request, res: Response, next: NextFunction): any => {
    return new Promise((resolve, reject): any => {
        const { body, headers } = req;
        const hash = paystackHash(body);
        console.log(hash);
        if (hash === headers['x-paystack-signature']) {
            res.locals.prisma = prisma;
            resolve(req);
        } else {
            reject(new NotAuthenticatedError('no authorization token found'));
        }
    })
        .then((): any => {
            next();
        })
        .catch((err: Error): any => next(err));
};

export default handlePaystackAuth;
