const userQueries = {
    users: (root: any, args: any, context: any, info: any) => {
        return context.prisma.users();
    }
};

const userMutations = {};

const userTypes = {
    User: {
        id: (parent: any) => parent.id,
        firstName: (parent: any) => parent.firstName,
        lastName: (parent: any) => parent.lastName,
        email: (parent: any) => parent.email,
        phoneNumber: (parent: any) => parent.phoneNumber,
        dob: (parent: any) => parent.dob,
        terms: (parent: any) => parent.terms,
        type: (parent: any, args: any, context: any) => context.prisma.user({ id: parent.id }).type()
    }
};

export { userTypes, userMutations, userQueries };
