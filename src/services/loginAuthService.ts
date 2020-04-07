import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginAuthService = async (res: any, data: any): Promise<any> => {
    const { email, password } = data;
    const { locals } = res;
    const { prisma } = locals;
    try {
        const [user] = await prisma.adminUsers({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: `There's no staff with the email ${email}`,
                data: null
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roleId: user.roleId
                },
                process.env.JWT_SECRETE
            );
            res.header('x-admin-auth', token);
            return {
                success: true,
                error: false,
                message: 'Authentication Successful!',
                data: token
            };
        }
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Wrong Password!',
            data: null
        });
    } catch (err) {
        throw err;
    }
};

export default loginAuthService;
