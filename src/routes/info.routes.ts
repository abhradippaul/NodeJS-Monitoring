import express from 'express';
import { getInfo } from '../controllers/info.controller.js';

const router = express.Router();

router.get('/', getInfo);

export default router;
