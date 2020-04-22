import express from 'express';
import Controller from './bid.controller';

const router: express.Router = express.Router();
const bidController = new Controller();

router.get('/', bidController.read.bind(bidController));
router.get('/findById', bidController.findById.bind(bidController));
router.get('/findByItemId', bidController.findByItemId.bind(bidController));
router.post('/', bidController.create.bind(bidController));
router.put('/', bidController.update.bind(bidController));
router.delete('/', bidController.delete.bind(bidController));

export default router;
