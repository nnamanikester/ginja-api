import { userModel } from '../../interfaces/auth';
import * as authService from '../../services/auth';
import * as bankService from '../../services/bank';
import * as organizationService from '../../services/organization';
import * as userService from '../../services/user';
import * as roleService from '../../services/role';
import * as hashUtility from '../../../core/utils/bcrypt';
import * as jwtUtility from '../../../core/utils/jwt';

const signUp = async (parent: any, args: userModel, context: any): Promise<any> => {
    try {
        // Create Bank Object
        const { id: bank } = await bankService.createBank({ parent, args, context });

        const pin = await hashUtility.hash(args.pin);

        // Create user
        const user = await userService.createUser({ parent, args, context });

        // Create user
        const { id: organization } = await organizationService.createOrganization({ parent, args, context }, { bank });

        // get owner role
        const { id: role } = await roleService.getRoleByParam({ parent, args, context }, { name: 'owner' });

        await organizationService.createUserOrganizationRoles({ parent, args, context }, { role, organization, user: user.id });

        const newArgs = { ...args, pin };

        // Create auth
        await authService.createAuth({ parent, args: newArgs, context }, { user: user.id });

        // 3
        const token = jwtUtility.signPayload({ userId: user.id });

        // 4
        return {
            token,
            user
        };
    } catch (error) {
        throw error;
    }
};

const login = async (parent: any, args: userModel, context: any): Promise<any> => {
    const { phoneNumber } = args;

    const { id, pin, userId } = (await authService.checkAuth({ parent, args, context }, { phoneNumber })) || {};

    if (!id) {
        throw new Error('No such user found');
    }
    const user = await userService.checkUser({ parent, args, context }, { id: userId });

    if (!user) {
        throw new Error('No such user found');
    }

    // 2
    const valid = await hashUtility.compare(args.pin, pin);

    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwtUtility.signPayload({ userId: user.id });

    // 3
    return {
        token,
        user
    };
};

export { signUp, login };
