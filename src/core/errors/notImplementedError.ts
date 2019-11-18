import DomainError from './domainError';

export default class NotImplementedError extends DomainError {
    protected error_name: string = 'not_implemented';

    protected httpCode: number = 500;

    public constructor(
        message: string = 'logic not implemented',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
