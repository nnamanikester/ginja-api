import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { NotAuthenticatedError } from '../../core/errors';

const handle = (req: Request, res: Response, next: NextFunction): any => {
    return new Promise((resolve, reject): any => {
        // Get Header

        // Get Bearer Token
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            resolve(req.headers.authorization.split(' ')[1]);
        } else {
            reject(new NotAuthenticatedError('no authorization token found'));
        }
    })
        .then((clientToken: string): any => {
            // Decode JWT
            let publicKey: Buffer;
            const dir = path.resolve(__dirname, './oauth-public.key');
            try {
                publicKey = fs.readFileSync('./oauth-public.key');
            } catch (err) {
                publicKey = fs.readFileSync(dir);
            }
            return jwt.verify(clientToken, publicKey, (err, decoded): any => {
                if (err) {
                    return Promise.reject(err);
                }

                res.locals.clientToken = clientToken;
                return decoded;
            });
        })
        .catch((err: any): any => {
            // Catch and Propagate Token Error
            if (err instanceof TokenExpiredError) {
                throw new NotAuthenticatedError('provided token has expired', err);
            } else if (err instanceof NotBeforeError) {
                throw new NotAuthenticatedError(`provided token cannot be used before ${err.date.toISOString()}`, err);
            } else {
                throw new NotAuthenticatedError('provided token is invalid.', err);
            }
        })
        .then((claims: any): any => {
            res.locals.claims = claims;
            next();
        })
        .catch((err: Error): any => next(err));
};

export default handle;
