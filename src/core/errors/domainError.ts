export default class DomainError extends Error {
    protected error_code: string = '00000';

    protected error_name: string = 'domain_error';

    protected status: boolean;

    protected internal: Error;

    protected httpCode: number = 500;

    protected data: object;

    public constructor(message: string, error: Error = undefined, data: object = [], status: boolean = false) {
        super(message);
        this.internal = error;
        this.data = data;
        this.status = status;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getCode(): string {
        return this.error_code;
    }

    public getInternalError(): Error {
        return this.internal;
    }

    public getHttpCode(): number {
        return this.httpCode;
    }

    public getData(): object {
        return this.data;
    }

    public getName(): string {
        return this.error_name;
    }
}
