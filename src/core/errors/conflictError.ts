import DomainError from './domainError';

export default class ConflictError extends DomainError {
    protected error_name: string = 'conflict';

    protected httpCode: number = 409;

    public constructor(
        message: string = 'The request could not be completed due to a conflict with the current state of the target resource',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
