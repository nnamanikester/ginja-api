import DomainError from './domainError';

export default class RequestValidationError extends DomainError {
    protected error_name: string = 'validation_error';

    protected httpCode: number = 422;

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
