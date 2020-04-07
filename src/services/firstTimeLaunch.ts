import bcrypt from 'bcrypt';

const saltRound = process.env.BCRYPT_SALT_ROUND;

const firstTimeLaunchService = async (res: any): Promise<any> => {
    const { locals } = res;
    const { prisma } = locals;
    try {
        const user = await prisma.adminUsers({
            where: {
                roleId: 1
            }
        });
        console.log(user);
        if (user !== []) {
            const roleData = {
                name: 'Super Admin'
            };
            const superAdmin = await prisma.createAdminRole(roleData);

            if (superAdmin) {
                const password = await bcrypt.hash('123456', saltRound);
                const userData = {
                    firstName: 'Super',
                    lastName: 'Admin',
                    email: 'admin@email.com',
                    phoneNumber: '08099887766',
                    roleId: 1,
                    password
                };
                const superUser = await prisma.createAdminUser(userData);
                if (superUser) {
                    return res.json({
                        success: true,
                        error: false,
                        message: 'Admin user created successfully!',
                        data: superUser
                    });
                }
                return {
                    success: false,
                    error: true,
                    message: 'Unable to create Super Admin',
                    data: null
                };
            }
            return {
                success: false,
                error: true,
                message: 'Unable to create role',
                data: null
            };
        }
        return {};
    } catch (err) {
        throw err;
    }
};

export default firstTimeLaunchService;
