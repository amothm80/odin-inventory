import express from 'express';
import { getSelectedCategory, checkAddItemInCategory,checkEditItemInCategory } from '../controllers/categories.js';
import { getAllItemsForCategory } from '../controllers/items.js';
import addItemRouter from './addItem.js'
import editItemRouter from './editItem.js'

const router = express.Router();
router.use('/:categoryID',getSelectedCategory)
router.use('/:categoryID',checkAddItemInCategory)
router.use('/:categoryID',checkEditItemInCategory)
router.use('/addItem/',addItemRouter)
router.use('/editItem/',editItemRouter)
router.get('/:categoryID',getAllItemsForCategory)

export default router;