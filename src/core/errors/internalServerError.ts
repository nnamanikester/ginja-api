import DomainError from './domainError';

export default class InternalServerError extends DomainError {
    protected error_name: string = 'server_error';

    protected httpCode: number = 500;

    public constructor(
        message: string = 'you have just experience an internal server error',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
