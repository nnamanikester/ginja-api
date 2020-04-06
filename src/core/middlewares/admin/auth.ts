import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/generated';

const auth = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.header('x-admin-auth');
    if (!token)
        return res.status(401).json({
            success: false,
            error: true,
            message: 'Access denied! No token provided.'
        });
    try {
        const data = jwt.verify(token, process.env.JWT_SECRETE);
        res.locals.prisma = prisma;
        req.user = data;
        return next();
    } catch (err) {
        res.status(400).json({
            success: false,
            error: true,
            message: 'Invald Token.'
        });
        return next(err);
    }
};

export default auth;
