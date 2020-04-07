import { Request, Response, NextFunction } from 'express';
import firstTimeLaunchService from '../../services/firstTimeLaunch';

const firstTimeLaunchController: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await firstTimeLaunchService(res);
        return res.json(data);
    } catch (error) {
        return next(error);
    }
};

export default firstTimeLaunchController;
