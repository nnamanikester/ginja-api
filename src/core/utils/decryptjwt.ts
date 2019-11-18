import jwt from 'jsonwebtoken';

export const decode = (token: string) => {
    return jwt.decode(token);
};
