import { signUp, login } from '../controllers/auth';

const authQueries = {
    auths: (root: any, args: any, context: any, info: any) => {
        return context.prisma.auths();
    }
};

const authMutations = {
    signUp: (root: any, args: any, context: any) => signUp(root, args, context),
    login: (root: any, args: any, context: any) => login(root, args, context)
};

const authTypes = {
    Auth: {
        id: (parent: any) => parent.id,
        email: (parent: any) => parent.email,
        phoneNumber: (parent: any) => parent.phoneNumber,
        pin: (parent: any) => parent.pin,
        userId: (parent: any) => parent.pin,
        user: (parent: any, args: any, context: any) => context.prisma.auth({ id: parent.id }).user()
    }
};

export { authTypes, authMutations, authQueries };
