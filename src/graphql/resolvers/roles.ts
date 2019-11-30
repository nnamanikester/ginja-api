import { createRole, getRoleByParam } from '../controllers/role';

const roleQueries = {
    roles: (root: any, args: any, context: any, info: any) => context.prisma.roles(),
    role: (root: any, args: any, context: any, info: any) => getRoleByParam(root, args, context)
};

const roleMutations = {
    createRole: (root: any, args: any, context: any) => createRole(root, args, context)
};

const roleTypes = {
    Role: {
        id: (parent: any) => parent.id,
        name: (parent: any) => parent.name
    }
};

export { roleTypes, roleMutations, roleQueries };
