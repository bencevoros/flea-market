import express from 'express';

import sampleRoute from '../modules/sample/sample.route';
import registrationRoute from '../modules/registration/registration.route';

const router: express.Router = express.Router();

router.use('/sample', sampleRoute);
router.use('/registration', registrationRoute);

export default router;
