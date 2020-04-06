import { Request, Response, NextFunction } from 'express';

const teamLeadPermit = (req: Request, res: Response, next: NextFunction): any => {
    if (req.user.roleId > 3) {
        return res.status(403).json({
            success: false,
            error: true,
            message: 'Access Denied.'
        });
    }
    return next();
};

export default teamLeadPermit;
