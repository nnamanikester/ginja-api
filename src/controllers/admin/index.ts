import { Request, Response, NextFunction } from 'express';

const adminController: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        res.json({ message: 'Welcome to GinjaBox Admin API' });
    } catch (error) {
        next(error);
    }
};

export default adminController;
