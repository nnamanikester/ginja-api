import * as utilityService from '../../core/helpers/utilities';
import logger from '../../core/utils/logger';

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

    public initializeTransaction = async (params: object): Promise<any> => {
        try {
            const body = await utilityService.validate(params, {
                reference: 'required|string',
                amount: 'required|numeric',
                email: 'required|string'
            });
            const response = await this.paystack.initializeTransaction({
                reference: body.reference,
                amount: body.amount,
                email: body.email
            });
            logger.info('Response account', response);
            return response;
        } catch (error) {
            logger.error('get token', error);
            throw error;
        }
    };

    public verifyTransaction = async (params: object): Promise<any> => {
        try {
            const body = await utilityService.validate(params, {
                reference: 'required|string'
            });
            const response = await this.paystack.verifyTransaction({
                reference: body.reference
            });
            logger.info('Response account', response);
            return response;
        } catch (error) {
            logger.error('get token', error);
            throw error;
        }
    };
}
