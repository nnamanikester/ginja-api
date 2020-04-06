import express from 'express';
import adminController from '../../../../controllers/admin/index';
import authController from '../../../../controllers/admin/auth';

const router = express.Router();

/**
 * Do not put any middleware here if you dont want it to affect the entire system
 */

/* GET home page. */
router.get('/', adminController);

// POST REQUESTS
router.post('/authenticate', authController);

export default router;
