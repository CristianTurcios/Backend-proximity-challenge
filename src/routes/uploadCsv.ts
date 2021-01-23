import { Router } from 'express';
import uploadCsv, { getData } from '../controllers/uploadCsv';

const multer = require('multer');

const upload = multer({ dest: 'tmp/csv' });
const router = Router();

router.get('/getData', getData);
router.post('/uploadCsv', upload.single('file'), uploadCsv);
export default router;
