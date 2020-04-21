import express from 'express';
import Controller from './email.controller';

const router: express.Router = express.Router();
const EmailController = new Controller();

router.get('/', EmailController.sendEmail.bind(EmailController));

export default router;
