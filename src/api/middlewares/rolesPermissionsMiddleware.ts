import { Request, Response, NextFunction } from 'express';
import { AccessControl } from 'accesscontrol';
import * as grantService from '../../core/services/grants';
import { NotAuthenticatedError } from '../../core/errors';
import models from '../../core/models';

interface GrantRequest extends Request {
    acl: any;
    role: any;
    permissions: any;
}

const ac = new AccessControl();

const setGrants = (rolesList: any) => {
    const grantObject: any = {};

    let type = '';

    if (rolesList.role.name.includes('admin')) {
        grantObject.admin = {};
        type = 'admin';
    }
    if (rolesList.role.name.includes('merchant')) {
        grantObject.merchant = {};
        type = 'merchant';
    }

    [...rolesList.role.resources.replace(/['"]+/g, '').split(',')].forEach(each => {
        const [resource, attributes] = each.split(':');
        const subRoutine = {};
        rolesList.role.actions.permissions.split(',').forEach((body: any) => {
            subRoutine[body.toLowerCase()] = attributes.split(',').map((attr: any) => attr);
        });
        switch (type) {
            case 'admin':
                if (resource === 'admin') grantObject.admin[resource] = subRoutine;
                break;
            case 'merchant':
                if (!(resource === 'admin')) grantObject.merchant[resource] = subRoutine;
                break;
            default:
                if (!(resource === 'admin')) grantObject.merchant[resource] = subRoutine;
                break;
        }
    });

    return ac.setGrants(grantObject);
};

const checkPermissions = (req: GrantRequest) => {
    let permission;
    const { baseUrl, acl, role, method } = req;
    const entity = baseUrl.split('/')[3];
  
    switch (method) {
        case 'GET':
            permission = acl.can(role).read(entity);
            break;
        case 'POST':
            permission = acl.can(role).create(entity);
            break;
        case 'PUT':
            permission = acl.can(role).update(entity);
            break;
        case 'DELETE':
            permission = acl.can(role).delete(entity);
            break;
        default:
            permission = null;
            break;
    }
    return permission;
};

const handle = (): any => (req: GrantRequest, res: Response, next: NextFunction): any => {
    new Promise(
        async (resolve, reject): Promise<any> => {
            try {
                let roles_id;
                if (res.locals.admin) {
                    const {
                        admin: { role_id }
                    } = res.locals;
                    roles_id = role_id;
                } else {
                    const {
                        account: { role_id }
                    } = res.locals;
                    roles_id = role_id;
                }

                const grants = await grantService.get('roles_permissions', {
                    where: { id: roles_id },
                    attributes: ['merchant_id', 'user_id'],
                    include: [
                        {
                            model: models.merchants_roles,
                            attributes: ['name', 'resources'],
                            as: 'role',
                            include: [
                                {
                                    model: models.merchants_permissions,
                                    attributes: ['permissions'],
                                    as: 'actions'
                                }
                            ]
                        }
                    ]
                });

                try {
                    const acl = setGrants(grants);
                  
                    req.role = grants.role.name.includes('admin') ? 'admin' : 'merchant';
                    req.acl = acl;
                } catch (err) {
                    throw new NotAuthenticatedError('roles associated with user is invalid', err);
                }
                const permission = checkPermissions(req);

                if (permission) {
                    if (!permission || !permission.granted) {
                        throw new NotAuthenticatedError('user not permitted for action', permission);
                    }
                }
                return resolve(true);
            } catch (err) {
                reject(err);
            }
        }
    )
        .then((): any => {
            next();
        })
        .catch((err: Error): any => next(err));
};

export default handle;
