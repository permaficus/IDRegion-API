import express from 'express'
import { FetchingData } from '../controller/index.js';
import { readFromCache } from '../middleware/cache.utils.js';

const router = express.Router();

router.get('/provinces', readFromCache(), FetchingData.provinces)
router.get('/city/:pid', readFromCache(), FetchingData.cities)
export { router }