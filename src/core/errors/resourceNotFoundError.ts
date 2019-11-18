import DomainError from './domainError';

export default class ResourceNotFoundError extends DomainError {
    protected error_name: string = 'not_found';

    protected httpCode: number = 404;

    public constructor(
        message: string = 'resource not found',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
