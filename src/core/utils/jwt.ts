import fs from 'fs';
import path from 'path';
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { NotAuthenticatedError } from '../errors';

interface SignOptions {
    issuer: string;
    subject: string;
    audience: string;
    expiresIn: string;
    algorithm: any | Algorithm;
}
const signPayload = (payload: object): any => {
    // SIGNING OPTIONS
    const signOptions: SignOptions = {
        issuer: process.env.JWT_TOKEN_ISSUER,
        subject: process.env.JWT_TOKEN_SUBJECT,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        expiresIn: process.env.JWT_TOKEN_TTL,
        algorithm: process.env.JWT_TOKEN_ALGORITHM
    };
    try {
        // Decode JWT
        let privateKey: Buffer;
        const dir = path.resolve(__dirname, './oauth-private.key');
        try {
            privateKey = fs.readFileSync('./oauth-private.key');
        } catch (err) {
            privateKey = fs.readFileSync(dir);
        }
        const token = jwt.sign(payload, privateKey, signOptions);
        return token;
    } catch (error) {
        console.log(error);
        throw new NotAuthenticatedError('Unable to complete authentication', error);
    }
};

export { signPayload };
