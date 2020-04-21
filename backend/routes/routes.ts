import express from 'express';

import registrationRoute from '../modules/registration/registration.route';
import loginRoute from '../modules/login/login.route';
import itemRoute from '../modules/item/item.route';
import bidRoute from '../modules/bid/bid.route';
import userRoute from  '../modules/user/user.route';
import emailRoute from  '../modules/email/email.route';

const router: express.Router = express.Router();

router.use('/registration', registrationRoute);
router.use('/login', loginRoute);
router.use('/item', itemRoute);
router.use('/user', userRoute);
router.use('/bid', bidRoute);
router.use('/email', emailRoute);
export default router;
