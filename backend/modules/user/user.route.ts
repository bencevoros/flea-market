import express from 'express';
import Controller from './user.controller';

const router: express.Router = express.Router();
const userConstroller = new Controller();

router.get('/', userConstroller.read.bind(userConstroller));
router.get('/findById', userConstroller.findById.bind(userConstroller));
router.post('/', userConstroller.create.bind(userConstroller));
router.put('/', userConstroller.update.bind(userConstroller));
router.delete('/', userConstroller.delete.bind(userConstroller));

export default router;
