import express from 'express';

import sampleRoute from '../modules/sample/sample.route';
import registrationRoute from '../modules/registration/registration.route';
import loginRoute from '../modules/login/login.route';
import itemRoute from '../modules/item/item.route';

const router: express.Router = express.Router();

router.use('/sample', sampleRoute);
router.use('/registration', registrationRoute);
router.use('/login', loginRoute);
router.use('/item', itemRoute);

export default router;
