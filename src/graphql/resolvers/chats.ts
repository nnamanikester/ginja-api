/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addMessage, chatMessages, chats } from '../controllers/chat';

const chatQueries = {
    chats,
    chatMessages
};

const chatMutations = {
    addMessage
};

const chatTypes = {
    Chat: {
        id: (parent: any) => parent.id,
        merchantId: (parent: any) => parent.merchantId,
        warehouserId: (parent: any) => parent.warehouserId,
        messages: (parent: any, args: any, context: any) => {
            return context.prisma.messages({ where: { id: parent.id } });
        }
    },
    Message: {
        id: (parent: any) => parent.id,
        chatId: (parent: any) => parent.chatId,
        from: (parent: any, args: any, context: any) => {
            return context.prisma.message({ id: parent.id }).from();
        },
        to: (parent: any, args: any, context: any) => {
            return context.prisma.message({ id: parent.id }).to();
        },
        text: (parent: any) => parent.text,
        createdAt: (parent: any) => parent.createdAt
    }
};

const chatSubscriptions = {
    message: {
        subscribe: (parent: any, args: any, context: any, info: any) => {
            const { pubsub } = context;
            return pubsub.asyncIterator(['NEW_MESSAGE']);
        }
    }
};

export { chatQueries, chatMutations, chatTypes, chatSubscriptions };
