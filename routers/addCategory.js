import express from 'express';
import { addCategory } from '../controllers/categories.js';

const router = express.Router();
router.post('/',addCategory)

export default router;