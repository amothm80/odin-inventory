import express from 'express';
import { addCategory} from '../controllers/categories.js';
import { checkCategorySchema } from '../controllers/categories.js';

const router = express.Router();
router.post('/', checkCategorySchema,addCategory)
export default router;