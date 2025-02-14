import express from 'express';
import { getAllCategories } from '../controllers/categories.js';

const router = express.Router();
router.use(getAllCategories)
router.get('/',(req,res)=>res.render('index'))

export default router;