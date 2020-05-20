import express from 'express';
import Controller, { upload } from './upload.controller';

const router: express.Router = express.Router();
const uploadController = new Controller();

router.post('/image', upload.single('file'), uploadController.uploadImage.bind(uploadController));

export default router;
