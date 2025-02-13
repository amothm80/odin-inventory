import express from 'express';
import { getAllCategories,getAllItemsForCategory } from '../controllers/read.js';

const router = express.Router();
router.use(getAllCategories)
router.get('/:categoryID',getAllItemsForCategory)
router.get('/',(req,res)=>res.render('index'))

export default router;