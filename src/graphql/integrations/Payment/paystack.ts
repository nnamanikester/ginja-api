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
}
