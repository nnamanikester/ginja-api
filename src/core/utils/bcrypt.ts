const bcrypt = require('bcryptjs');

const hash = async (password: string): Promise<any> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
};

const compare = async (a: string, b: string): Promise<any> => {
    try {
        return await bcrypt.compare(a, b);
    } catch (error) {
        throw error;
    }
};

export { hash, compare };
