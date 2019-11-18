import express from 'express';
import indexController from '../controllers/index';

const router = express.Router();

/**
 * Do not put any middleware here if you dont want it to affect the entire system
 */

/* GET home page. */
router.get('/', indexController.home);

export default router;
