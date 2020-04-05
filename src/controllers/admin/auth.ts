import { Request, Response, NextFunction } from 'express';

const authController: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        res.json({ message: 'Yes' });
    } catch (error) {
        next(error);
    }
};

export default authController;
