import { Request, Response, NextFunction } from 'express';

const managementPermit = (req: Request, res: Response, next: NextFunction): any => {
    if (req.user.roleId > 2) {
        return res.status(403).json({
            success: false,
            error: true,
            message: 'Access Denied.'
        });
    }
    return next();
};

export default managementPermit;
