/* eslint-disable @typescript-eslint/explicit-function-return-type */

const createChat = async (graph: any) => {
    const {
        context: { prisma },
        args: { merchantId, warehouserId, requisitionId }
    } = graph;

    // check if chat already exists;
    const oldChat = await prisma.chats({ where: { merchantId, warehouserId } });
    if (oldChat.length > 0) return oldChat;

    const chat = await prisma.createChat({
        merchantId,
        warehouserId,
        merchant: {
            connect: {
                id: merchantId
            }
        },
        warehouser: {
            connect: {
                id: warehouserId
            }
        },
        requisitionId
    });

    return chat;
};

const getAllChats = async (graph: any) => {
    const {
        context: { prisma, userId }
    } = graph;

    const filter = { OR: [{ merchantId: userId }, { warehouserId: userId }] };
    const chats = await prisma.chats({ where: { ...filter } });
    return chats;
};

const getChatMessages = async (graph: any) => {
    const {
        context: { prisma },
        args: { chatId }
    } = graph;
    const messages = await prisma.messages({ where: { chatId }, orderBy: 'createdAt_DESC' });
    return messages;
};

const createMessage = async (graph: any) => {
    const {
        context: { prisma, userId, pubsub },
        args: { chatId, text }
    } = graph;

    const newMessage = await prisma.createMessage({
        chatId,
        from: {
            connect: {
                id: userId
            }
        },
        text
    });

    const user = await prisma.message({ id: newMessage.id }).from();
    const message = { ...newMessage, from: user };

    pubsub.publish('NEW_MESSAGE', { message });
    return message;
};

export { getAllChats, createChat, getChatMessages, createMessage };
