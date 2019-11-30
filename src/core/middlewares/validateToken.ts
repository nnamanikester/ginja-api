import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { NotAuthenticatedError } from '../../core/errors';

interface payloadType {
    userId: string;
}

const verifyToken = (resolve: any, parent: any, args: any, context: any, info: any): any => {
    const verifyOptions = {
        issuer: process.env.JWT_TOKEN_ISSUER,
        subject: process.env.JWT_TOKEN_SUBJECT,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        expiresIn: process.env.JWT_TOKEN_TTL,
        algorithm: [process.env.JWT_TOKEN_ALGORITHM]
    };

    const token = context.request.get('Authorization');

    try {
        if (token) {
            // Decode JWT
            let publicKey: Buffer;
            const dir = path.resolve(__dirname, './oauth-public.key');
            try {
                publicKey = fs.readFileSync('./oauth-public.key');
            } catch (err) {
                publicKey = fs.readFileSync(dir);
            }
            const payload = jwt.verify(token, publicKey, verifyOptions);
            return payload;
        }
        throw new NotAuthenticatedError('Not authenticated');
    } catch (err) {
        // Catch and Propagate Token Error
        if (err instanceof TokenExpiredError) {
            throw new NotAuthenticatedError('provided token has expired', err);
        } else if (err instanceof NotBeforeError) {
            throw new NotAuthenticatedError(`provided token cannot be used before ${err.date.toISOString()}`, err);
        } else {
            console.log(err);
            throw new NotAuthenticatedError('provided token is invalid.', err);
        }
    }
};

export default verifyToken;
