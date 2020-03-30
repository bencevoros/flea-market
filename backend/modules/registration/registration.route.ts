import express from 'express';
import Controller from './registration.controller';

const router: express.Router = express.Router();
const registrationController = new Controller();

router.post('/', registrationController.create.bind(registrationController));

export default router;
