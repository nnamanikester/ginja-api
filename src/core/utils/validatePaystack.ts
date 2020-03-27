import crypto from 'crypto';

const secret = process.env.PAYSTACK_API_KEY;

const hash = (params: any) =>
    crypto
        .createHmac('sha512', secret)
        .update(JSON.stringify(params))
        .digest('hex');

export default hash;
