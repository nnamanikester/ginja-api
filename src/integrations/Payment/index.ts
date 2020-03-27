import Paystack from './paystack';

export default class Payment {
    public paystack: Paystack;

    public constructor() {
        this.paystack = new Paystack();
    }
}
