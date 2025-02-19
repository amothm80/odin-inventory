import express from 'express';
import { getSelectedCategory, checkAddItemInCategory,checkEditItemInCategory } from '../controllers/categories.js';
import { getAllItemsForCategory } from '../controllers/items.js';
import { addCategory} from '../controllers/categories.js';
import { checkCategorySchema } from '../controllers/categories.js';
// import addCategoryRouter from './routers/addCategory.js'

const router = express.Router();
router.post('/addCategory', checkCategorySchema,addCategory)
router.use('/:categoryID',getSelectedCategory)
router.use('/:categoryID',checkAddItemInCategory)
router.use('/:categoryID',checkEditItemInCategory)
router.get('/:categoryID',getAllItemsForCategory)

export default router;

