import express from 'express';
import Controller from './item.controller';

const router: express.Router = express.Router();
const itemController = new Controller();

router.get('/', itemController.read.bind(itemController));
router.get('/findById', itemController.findById.bind(itemController));
router.post('/', itemController.create.bind(itemController));
router.put('/', itemController.update.bind(itemController));
router.delete('/', itemController.delete.bind(itemController));

export default router;
