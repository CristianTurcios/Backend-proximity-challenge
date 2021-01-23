import { Router } from 'express';
import uploadCsv from './uploadCsv';

const router = Router();

router.use('/', uploadCsv);

router.get('/', (req, res) => {
  res.status(200).send({ success: 'Welcome' });
});

export default router;
