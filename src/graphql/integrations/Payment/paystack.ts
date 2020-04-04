import * as utilityService from '../../../core/helpers/utilities';
import logger from '../../../core/utils/logger';

const PayStack = require('paystack-node');
const APIKEY = process.env.PAYSTACK_API_KEY;
const environment = process.env.NODE_ENV;

export default class Paystack {
    private paystack = new PayStack(APIKEY, environment);

    public resolveAccountNumber = async (params: object): Promise<any> => {
        try {
            const body = await utilityService.validate(params, {
                accountNumber: 'required|string',
                bankCode: 'required|string'
            });
            const response = await this.paystack.resolveAccountNumber({
                account_number: body.accountNumber,
                bank_code: body.bankCode
            });
            logger.info('Response account', response);
            return response;
        } catch (error) {
            logger.error('get token', error);
            throw error;
        }
    };

    public verifyTransaction = async (params: any): Promise<any> => {
        const response = await this.paystack.verifyTransaction({
            reference: params.reference
        });

        return response.body;
    };

    public createTransferRecipient = async (params: any): Promise<any> => {
        // TODO add validation
        const response = await this.paystack.createTransferRecipient({
            type: 'nuban',
            name: params.name,
            description: params.description || '',
            account_number: params.account,
            bank_code: params.bankCode,
            currency: 'NGN'
        });

        return response.body;
    };

    public initializeTransfer = async (params: any): Promise<any> => {
        const response = await this.paystack.initiateTransfer({
            source: 'balance',
            amount: params.amount,
            recipient: params.recipient,
            reference: params.reference
        });

        return response.body;
    };

    // Paystack Package dosen't support verification of transfer
    public verifyTransfer = async (params: any): Promise<any> => {};
}
