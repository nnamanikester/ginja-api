import { Request, Response } from 'express';

export default {
    home: (req: Request, res: Response): void => {
        res.render('index.ejs', { title: 'Ginjabox  Middleware Engine' });
    }
};
