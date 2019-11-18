import express from 'express';
import authController from '../../controllers/auth';

import logRequests from '../../middlewares/logrequests';

const router = express.Router();

router.use(logRequests);

router.post('/', authController.login);

export default router;
