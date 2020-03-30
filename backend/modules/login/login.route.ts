import express from 'express';
import Controller from './login.controller';

const router: express.Router = express.Router();
const loginController = new Controller();

router.post('/', loginController.login.bind(loginController));

export default router;
