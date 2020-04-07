import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/generated';

const loginAuth = (req: Request, res: Response, next: NextFunction): any => {
    try {
        res.locals.prisma = prisma;
        return next();
    } catch (err) {
        return next(err);
    }
};

export default loginAuth;
