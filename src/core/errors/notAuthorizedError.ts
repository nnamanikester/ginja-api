import DomainError from './domainError';

export default class NotAuthorizedError extends DomainError {
    protected error_name: string = 'not_authorized';

    protected httpCode: number = 403;

    public constructor(
        message: string = 'request is not authorized',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
