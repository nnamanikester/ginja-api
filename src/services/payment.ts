import Payment from '../integrations/Payment';

const payment = new Payment();

// Create Bank
const initializePayment = async (graph: any) => {
    const { args, context } = graph;
    const { prisma } = context;
    const { requisitionId, amount, email, currency = 'NGN' } = args;

    try {
        const { id: reference } = await prisma.createPayment({
            amount,
            email,
            requisition: {
                connect: { id: requisitionId }
            },
            customer: {
                create: { email }
            },
            status: 0,
            currency,
            info: 'Payment successfully generated!'
        });

        const response = await payment.paystack.initializeTransaction({
            reference,
            amount,
            email
        });

        if (response && response.body && response.body.status) {
            const {
                body: {
                    data: { reference: transactionRef, authorization_url: authorizationUrl, access_code: accessCode }
                }
            } = response;
            return { status: true, transactionRef, amount, authorizationUrl, accessCode };
        }
        return { status: false };
    } catch (error) {
        throw error;
    }
};

// Resolve Account Number
const verifyPayment = async (graph: any) => {
    const { args } = graph;
    const { reference } = args;

    try {
        const response = await payment.paystack.verifyTransaction({
            reference
        });

        if (response && response.body && response.body.status) {
            const {
                body: {
                    data: { reference: transactionRef, amount }
                }
            } = response;
            return { status: true, transactionRef, amount };
        }
        return { status: false };
    } catch (error) {
        throw error;
    }
};

const handlePaystackWebhook = async (body: any, prisma: any) => {
    const { reference: id, customer: customerBody, channel } = body;
    try {
        const customer = {
            paystackId: `${customerBody.id}`,
            customerCode: customerBody.customer_code,
            firstName: customerBody.first_name,
            lastName: customerBody.last_name,
            email: customerBody.email
        };

        const { id: requisitionId } = await prisma
            .updatePayment({
                where: { id },
                data: {
                    channel,
                    customer: { update: customer },
                    status: 1
                }
            })
            .requisition();

        const result = await prisma.updateRequisition({
            where: { id: requisitionId },
            data: {
                status: 2
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to receive request');
    }
};

export { initializePayment, verifyPayment, handlePaystackWebhook };
