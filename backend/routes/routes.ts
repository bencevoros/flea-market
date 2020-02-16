import express from 'express';

import sampleRoute from '../modules/sample/sample.route';

const router: express.Router = express.Router();

router.use('/sample', sampleRoute);

export default router;
