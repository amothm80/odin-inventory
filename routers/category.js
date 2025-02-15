import express from 'express';
import { getSelectedCategory, checkAddItemInCategory } from '../controllers/categories.js';
import { getAllItemsForCategory } from '../controllers/items.js';

const router = express.Router();
router.use('/:categoryID',getSelectedCategory)
router.use('/:categoryID',checkAddItemInCategory)
router.get('/:categoryID',getAllItemsForCategory)

export default router;