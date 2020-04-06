import { Request, Response, NextFunction } from 'express';

const handle = (defaultLimit: number = 10, maxLimit: number = 50): any => (req: Request, res: Response, next: NextFunction): any => {
    res.locals.paginate = {};

    let page = 1;
    let limit = 10;

    // Validate Page Number
    page = req.query.page !== undefined ? parseInt(req.query.page, 10) || 1 : 1;
    // Validate Limit
    limit = req.query.limit !== undefined ? parseInt(req.query.limit, 10) || 0 : defaultLimit;

    // Make sure limit is not greater than the allowed maximum
    if (limit > maxLimit) {
        limit = maxLimit;
    }

    // Make sure page is not zero or less
    if (page < 1) {
        page = 1;
    }

    // Make sure limit is not zero or less
    if (limit < 0) {
        limit = defaultLimit;
    }

    res.locals.paginate.page = page;
    res.locals.paginate.limit = limit;
    res.locals.paginate.hasPreviousPages = page > 1;
    // eslint-disable-next-line no-multi-assign
    res.locals.paginate.skip = res.locals.paginate.offset = (page - 1) * limit;
    res.locals.paginate.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    next();
};

export default handle;
