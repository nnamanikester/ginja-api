import { Request, Response, NextFunction } from 'express';

const superAdminPermit = (req: Request, res: Response, next: NextFunction): any => {
    if (req.user.roleId !== 1) {
        return res.status(403).json({
            success: false,
            error: true,
            message: 'Access Denied.'
        });
    }
    return next();
};

export default superAdminPermit;
