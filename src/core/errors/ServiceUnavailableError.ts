import DomainError from './domainError';

export default class ServiceUnavailableError extends DomainError {
    protected error_name: string = 'service_unavailable';

    protected httpCode: number = 503;

    public constructor(
        message: string = 'service currently unavailable.',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
