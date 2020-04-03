import * as chatServices from '../../services/chats';

const chats = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await chatServices.getAllChats({ parent, context, args });
    } catch (error) {
        throw error;
    }
};

const chatMessages = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await chatServices.getChatMessages({ parent, context, args });
    } catch (error) {
        throw error;
    }
};

const addMessage = async (parent: any, args: any, context: any): Promise<any> => {
    try {
        return await chatServices.createMessage({ parent, context, args });
    } catch (error) {
        throw error;
    }
};

export { chats, chatMessages, addMessage };
