/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Payment from '../integrations/Payment';
import { createTransaction } from './transaction';
import { changeStatus, requisitions } from './requisition';
import { Int } from 'src/core/prisma/generated';

const payment = new Payment();

const createWallet = async (graph: any, params: any) => {
    try {
        const {
            context: { prisma }
        } = graph;

        const { bank, user } = params;

        return await prisma.createWallet({
            ledgerBalance: 0,
            availableBalance: 0,
            owner: {
                connect: {
                    id: user
                }
            },
            bank: {
                connect: {
                    id: bank
                }
            }
        });
    } catch (error) {
        throw error;
    }
};

// Add Money to Wallet
const fundWallet = async (graph: any, params: any): Promise<any> => {
    // verify if payment was successful
    const {
        args: { reference },
        context: { prisma, userId }
    } = graph;
    const { data, status } = await payment.paystack.verifyTransaction({
        reference
    });

    if (status !== true) {
        return { success: false };
    }

    const filter = { owner: { id: userId } };

    // update user wallet
    const user = await prisma.wallet({ where: { ...filter } });
    const updateData = {
        ledgerBalance: user.ledgerBalance + data.amount,
        availableBalance: user.availableBalance + data.amount
    };
    await prisma.updateWallet({ where: { ...filter }, data: { ...updateData } });

    // create a transaction
    await createTransaction({
        from: user.id,
        to: user.id,
        amount: data.amount,
        type: 'payment'
    });

    return { success: true };
};

// TODO:
// withdraw Money from account
const withdrawFromWallet = async (graph: any, params: any) => {};

// make payment
const makePayment = async (graph: any) => {
    try {
        const {
            args: { requisition },
            context: { prisma }
        } = graph;
        const {
            user,
            listing: { user: warehouser },
            cost: { baseCost, vat, discount }
        } = requisition;

        // calculate total Payable Amount
        const totalAmount = baseCost + (discount / 100) * baseCost - (vat / 100) * baseCost;
        // convert totalAmount to Kobo
        const amountInKobo: Int = totalAmount * 100;

        // check balance of merchant that is making payment;
        const merchant = await prisma.wallet({
            userId: user.id
        });

        merchant.ledgerBalance = merchant.ledgerBalance ? merchant.ledgerBalance : 0;

        // if amount in wallet less than payable amount
        if (!merchant || merchant.ledgerBalance < amountInKobo) {
            return { success: false };
        }

        // get warehouser payment was made to and reflect payment
        const filter = { userId: warehouser.id };
        const owner = await prisma.wallet({ ...filter });
        owner.availableBalance = owner.availableBalance ? owner.availableBalance : 0;

        const updatedBalance = owner.availableBalance + amountInKobo;

        await prisma.updateWallet({
            where: { ...filter },
            data: { availableBalance: updatedBalance }
        });

        // deduct amount from merchants wallet
        await prisma.updateWallet({
            where: { userId: user.id },
            data: { ledgerBalance: merchant.ledgerBalance - amountInKobo }
        });

        const transactionArgs = {
            to: warehouser.id,
            user: user.id,
            amount: amountInKobo,
            type: 'payment',
            description: ''
        };

        // create a new transaction for payment
        await createTransaction({ args: transactionArgs, context: graph.context });

        // update Requisition status
        await changeStatus({ args: { status: 4, id: requisition.id }, context: graph.context });

        return { success: true };
    } catch (error) {
        throw error;
    }
};

export { createWallet, makePayment, fundWallet as addMoneyToWallet, withdrawFromWallet };
