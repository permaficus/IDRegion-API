import express from 'express'
import { FetchingData } from '../controller/index.js';

const router = express.Router();

router.get('/provinces', FetchingData.provinces)
router.get('/city/:pid', FetchingData.cities)
export { router }