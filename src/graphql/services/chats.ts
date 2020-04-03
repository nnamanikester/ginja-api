/* eslint-disable @typescript-eslint/explicit-function-return-type */

const createChat = async (graph: any) => {
    const {
        context: { prisma },
        args: { merchantId, warehouserId }
    } = graph;

    // check if chat already exists;
    const oldChat = await prisma.chats({ where: { merchantId, warehouserId } });
    if (oldChat.length > 0) return oldChat;

    const chat = await prisma.createChat({
        merchantId,
        warehouserId
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

    console.log(userId);

    const newMessage = await prisma.createMessage({
        chatId,
        to: {
            connect: {
                id: chatId
            }
        },
        from: {
            connect: {
                id: userId
            }
        },
        text
    });

    const messages = await prisma.messages({
        where: {
            id: newMessage.id
        }
    });

    console.log('---------------------------------');
    console.log(messages);
    console.log('---------------------------------');

    pubsub.publish('NEW_MESSAGE', { message: messages[0] });
    return messages[0];
};

export { getAllChats, createChat, getChatMessages, createMessage };
