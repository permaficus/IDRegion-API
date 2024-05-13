import express from 'express'
import { FetchingData } from '../controller/index.js';
import { readFromCache } from '../middleware/cache.utils.js';

export const router = express.Router();

router.get('/:model/:pid?', readFromCache(), FetchingData);