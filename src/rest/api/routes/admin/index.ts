import express from 'express';
import adminController from '../../../../controllers/admin/index';
import loginAuthController from '../../../../controllers/admin/loginAuth';

// Middlewares
import loginAuth from '../../../../core/middlewares/admin/loginAuth';
import auth from '../../../../core/middlewares/admin/auth';
import superAdminPermit from '../../../../core/middlewares/admin/superAdmin';
import managementPermit from '../../../../core/middlewares/admin/management';
import teamLeadPermit from '../../../../core/middlewares/admin/teamLead';
import supportPermit from '../../../../core/middlewares/admin/support';

const router = express.Router();

/**
 * Do not put any middleware here if you dont want it to affect the entire system
 */

/* GET home page. */
router.get('/', adminController);

// POST REQUESTS
router.post('/authenticate', loginAuth, loginAuthController);

// UPDATE REQUESTS

// DELETE REQUESTS

export default router;
