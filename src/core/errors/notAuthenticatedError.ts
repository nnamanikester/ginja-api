import DomainError from './domainError';

export default class NotAuthenticatedError extends DomainError {
    protected error_name: string = 'not_authenticated';

    protected httpCode: number = 401;

    public constructor(
        message: string = 'this request is not authenticated',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
