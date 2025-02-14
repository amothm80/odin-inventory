import express from 'express';
import { getAllCategories, getSelectedCategory } from '../controllers/categories.js';
import { getAllItemsForCategory } from '../controllers/items.js';

const router = express.Router();
router.use(getAllCategories)
router.use('/:categoryID',getSelectedCategory)
router.get('/:categoryID',getAllItemsForCategory)

export default router;