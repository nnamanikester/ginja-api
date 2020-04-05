import { Request, Response } from 'express';

export default {
    home: (req: Request, res: Response): void => {
        res.json({ welcome: 'Welcome to GinjaBox API' });
    }
};
