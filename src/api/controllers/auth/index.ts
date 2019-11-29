import { Request, Response, NextFunction } from 'express';
import * as utilities from '../../../core/helpers/utilities';
import * as authService from '../../services/auth';
import { decode } from '../../../core/utils/decryptjwt';
import { ResourceNotFoundError } from '../../../core/errors';

/**
 * Create a Merchant
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

interface AuthObjectInterface {
    access_token: string;
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body: any = await utilities.validate(req.body, {
            grant_type: 'required|string',
            client_id: 'required|numeric',
            client_secret: 'required|string',
            username: 'required|string',
            password: 'required|string'
        });

        const responseData = {
            account: 1
        };
        res.json(utilities.itemResponse(responseData, 'login successfull'));
    } catch (error) {
        next(error);
    }
};

export default {
    login
};
