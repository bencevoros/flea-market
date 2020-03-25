import express from 'express';
import Controller from './sample.controller';

const router: express.Router = express.Router();
const sampleController = new Controller();

router.get('/', sampleController.read.bind(sampleController));
router.get('/findById', sampleController.findById.bind(sampleController));
router.post('/', sampleController.create.bind(sampleController));
router.put('/', sampleController.update.bind(sampleController));
router.delete('/', sampleController.delete.bind(sampleController));

export default router;
