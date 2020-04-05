import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../core/prisma/generated';

const authController: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const [staff]: any[] = await prisma.adminUsers({
            where: {
                email: req.body.email
            }
        });
        if (!staff) {
            return res.json({
                success: false,
                error: true,
                message: `There's no staff with the email ${req.body.email}`,
                data: null
            });
        }
        if (staff.password === req.body.password) {
            return res.json({
                success: true,
                error: false,
                message: 'Authentication Successful!',
                data: staff
            });
        }
        return res.json({
            success: false,
            error: true,
            message: 'Wrong Password!',
            data: null
        });
    } catch (error) {
        return next(error);
    }
};

export default authController;
