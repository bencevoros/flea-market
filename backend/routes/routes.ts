import express from 'express';

import sampleRoute from '../modules/sample/sample.route';
import registrationRoute from '../modules/registration/registration.route';
import loginRoute from '../modules/login/login.route';

const router: express.Router = express.Router();

router.use('/sample', sampleRoute);
router.use('/registration', registrationRoute);
router.use('/login', loginRoute);

export default router;
