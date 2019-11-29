import { createUser, createRole } from '../controllers/auth';

const authQueries = {
    users: (root: any, args: any, context: any, info: any) => {
        return context.prisma.users();
    },
    banks: (root: any, args: any, context: any, info: any) => {
        return context.prisma.banks();
    },
    auths: (root: any, args: any, context: any, info: any) => {
        return context.prisma.auths();
    },
    roles: (root: any, args: any, context: any, info: any) => {
        return context.prisma.roles();
    }
};

const authMutations = {
    createUser: (root: any, args: any, context: any) => createUser(root, args, context),
    signup
    createRole: (root: any, args: any, context: any) => createRole(root, args, context)
};

const authTypes = {
    Auth: {
        id: (parent: any) => parent.id,
        email: (parent: any) => parent.email,
        phoneNumber: (parent: any) => parent.phoneNumber,
        pin: (parent: any) => parent.pin,
        user: (parent: any, args: any, context: any) => context.prisma.auth({ id: parent.id }).user()
    },
    User: {
        id: (parent: any) => parent.id,
        firstName: (parent: any) => parent.firstName,
        lastName: (parent: any) => parent.lastName,
        type: (parent: any) => parent.type,
        email: (parent: any) => parent.email,
        phoneNumber: (parent: any) => parent.phoneNumber,
        dob: (parent: any) => parent.dob,
        bank: (parent: any, args: any, context: any) => context.prisma.user({ id: parent.id }).bank()
    },

    Role: {
        id: (parent: any) => parent.id,
        name: (parent: any) => parent.name
    },

    Bank: {
        id: (parent: any) => parent.id,
        accountNumber: (parent: any) => parent.accountNumber,
        bankCode: (parent: any) => parent.bankCode,
        accountName: (parent: any) => parent.accountName,
        bankName: (parent: any) => parent.bankName
    },

};

export { authTypes, authMutations, authQueries };
