const sgMail = require('@sendgrid/mail');

import logger from './logger';

export default class MailTransport {

    public instance: any;

    public constructor() {
        this.instance = sgMail;
        sgMail.setApiKey(process.env.SENDGRID_KEY);
    }

    public sendMail = (email: object) => {

        try {
            return this.instance.send(email);
        } catch (err) {
            logger.error(err);
            throw err;
        }
    };
}
