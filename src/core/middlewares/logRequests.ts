import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

export default async (request: Request, _response: Response, next: NextFunction): Promise<any> => {
    next();
    const requestDetails = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const hostName = request.hostname;
    logger.info(`${request.originalUrl}, HOSTNAME: ${hostName}, REQUESTORDETAILS: ${requestDetails}`);
};
