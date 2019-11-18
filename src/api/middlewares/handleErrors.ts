import express from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import DomainError from '../../core/errors/domainError';
import logger from '../../core/utils/logger';
import { AxiosError } from 'axios';

function handle(_err: AxiosError, req: express.Request, res: express.Response, _next: express.NextFunction): any {
    logger.error(_err.stack);
    if (_err instanceof DomainError) {
        const err = _err as DomainError;

        const errorData = {
            status: err.getStatus(),
            error: err.getName(),
            message: err.message,
            data: {}
        };

        if (err.getData() !== undefined) {
            errorData.data = err.getData();
        }

        res.status(_err.getHttpCode()).send(errorData);
    } else if (_err instanceof ValidationError) {
        const errorData = {
            status: false,
            error: '',
            message: '',
            data: {}
        };
        const httpCode = 400;

        errorData.error = 'validation_error';
        errorData.message = 'the provided payload was not valid';

        const data: { [key: string]: any[] } = {};
        const err = _err as ValidationError;

        err.errors.forEach((validationErrorItem: ValidationErrorItem): void => {
            const itemErrors = [];
            itemErrors.push(validationErrorItem.message);

            data[validationErrorItem.path] = itemErrors;
        });

        errorData.data = data;
        res.status(httpCode).send(errorData);
    } else {
        if (_err.isAxiosError) {
            const errorCode: any = _err.response.status;
            return res.status(errorCode).send({
                status: false,
                message: _err.response.data.message || 'Unable to complete request',
                data: null
            });
        }
        return res.status(500).send({
            status: false,
            message: 'Internal server error. It would be nice if you report this to us.',
            data: null
        });
    }
}

export default handle;
