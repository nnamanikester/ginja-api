import DomainError from './domainError';

export default class EmailProcessingError extends DomainError {
    protected error_name: string = 'processing_error';

    protected httpCode: number = 422;

    public constructor(
        message: string = 'Unable to complete request.',
        error: Error = undefined,
        data: any = null,
        status: boolean = false
    ) {
        super(message, error, data, status);
        Error.captureStackTrace(this, this.constructor);
    }
}
