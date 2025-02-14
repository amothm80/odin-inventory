import express from 'express';
import { getAllCategories } from '../controllers/categories.js';
import { getAllItemsForCategory } from '../controllers/items.js';

const router = express.Router();
router.use(getAllCategories)
router.get('/:categoryID',getAllItemsForCategory)

export default router;