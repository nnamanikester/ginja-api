import { getRandomString, formatPhoneNumberToInternational } from '../../core/helpers/utilities';
import { sendSms } from '../../core/sms/africastalking';

const generateOtp = async (graph: any) => {
    const {
        args: { phoneNumber },
        context
    } = graph;

    const { prisma } = context;

    const code = getRandomString(6, 'numeric');

    try {
        const success = await prisma.$exists.otp({
            phoneNumber
        });
        if (success) {
            const otp = await prisma.updateOtp({
                data: {
                    code,
                    validated: false
                },
                where: {
                    phoneNumber
                }
            });
            const to: any = [formatPhoneNumberToInternational(phoneNumber, '+234')];
            const message: string = `Your Otp is ${code}`;
            await sendSms(to, process.env.AFRICAS_TALKING_SENDER_ID, message);
            return { ...otp, code: 'sent' };
        }
        const otp = await prisma.createOtp({
            code,
            phoneNumber,
            validated: false
        });
        const to: any = [formatPhoneNumberToInternational(phoneNumber, '+234')];
        const message: string = `Your Otp is ${code}`;
        await sendSms(to, process.env.AFRICAS_TALKING_SENDER_ID, message);
        return { ...otp, code: 'sent' };
    } catch (error) {
        throw error;
    }
};

const validateOtp = async (graph: any) => {
    const {
        args: { otp, phoneNumber },
        context: { prisma }
    } = graph;

    try {
        const success = await prisma.$exists.otp({
            AND: [
                {
                    code: otp
                },
                {
                    phoneNumber
                }
            ]
        });
        if (success) {
            await prisma.updateOtp({
                data: {
                    validated: true
                },
                where: {
                    phoneNumber
                }
            });
            return { success };
        }
        throw new Error('Invalid OTP');
    } catch (error) {
        throw error;
    }
};

export { generateOtp, validateOtp };
