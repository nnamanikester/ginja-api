import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma: any = new PrismaClient();

const authController: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = await prisma.adminUser.findOne({
        where: {
            email_password: {
                email: req.body.email,
                password: req.body.password
            }
        }
    });
    try {
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export default authController;
