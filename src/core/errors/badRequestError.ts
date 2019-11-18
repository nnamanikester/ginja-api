import DomainError from './domainError';

export default class BadRequestError extends DomainError {
    protected error_name: string = 'bad_request';

    protected httpCode: number = 400;

    public constructor(
        message: string = 'invalid data provided for the request',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
