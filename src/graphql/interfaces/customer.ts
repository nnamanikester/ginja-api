export interface AddCustomerReturnProps {
    id: string | number;
    name: string;
    phone?: string;
    email?: string;
}

export interface AddCustomerProps {
    name: string;
    phone?: string;
    email?: string;
}
export interface PatchCustomerProps {
    name?: string;
    phone?: string;
    email?: string;
}

export interface RetrieveAllCustomersProps {
    limit: number | string;
    offset: number | string;
}
