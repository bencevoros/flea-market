import express from 'express';
import Controller from './follower.controller';

const router: express.Router = express.Router();
const followerController = new Controller();

router.get('/', followerController.read.bind(followerController));
router.get('/findById', followerController.findById.bind(followerController));
router.get('/findByUserId', followerController.findByUserId.bind(followerController));
router.get('/findByItemId', followerController.findByItemId.bind(followerController));
router.get('/findByItemAndUserId', followerController.findByItemAndUserId.bind(followerController));
router.post('/', followerController.create.bind(followerController));
router.put('/', followerController.update.bind(followerController));
router.delete('/', followerController.delete.bind(followerController));

export default router;
