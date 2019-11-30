import { createOrganizationType } from '../controllers/organization';

const organizationQueries = {
    organizations: (root: any, args: any, context: any, info: any) => {
        return context.prisma.organizations();
    },
    organizationTypes: (root: any, args: any, context: any, info: any) => {
        return context.prisma.organizationTypes();
    },
    userOrganizationRoles: (root: any, args: any, context: any, info: any) => {
        return context.prisma.userOrganizationRoles();
    }
};

const organizationMutations = {
    createOrganizationType: (root: any, args: any, context: any) => createOrganizationType(root, args, context)
};

const organizationTypes = {
    Organization: {
        id: (parent: any) => parent.id,
        name: (parent: any) => parent.name,
        email: (parent: any) => parent.email,
        phoneNumber: (parent: any) => parent.phoneNumber,
        bank: (parent: any, args: any, context: any) => context.prisma.organization({ id: parent.id }).bank(),
        type: (parent: any, args: any, context: any) => context.prisma.organization({ id: parent.id }).type()
    },
    OrganizationType: {
        id: (parent: any) => parent.id,
        name: (parent: any) => parent.name
    },
    UserOrganizationRole: {
        id: (parent: any) => parent.id,
        user: (parent: any, args: any, context: any) => context.prisma.userOrganizationRole({ id: parent.id }).user(),
        role: (parent: any, args: any, context: any) => context.prisma.userOrganizationRole({ id: parent.id }).role(),
        organization: (parent: any, args: any, context: any) => context.prisma.userOrganizationRole({ id: parent.id }).organization()
    }
};

export { organizationTypes, organizationMutations, organizationQueries };
