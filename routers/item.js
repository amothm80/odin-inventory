import express from 'express';
import { checkItemSchema } from '../controllers/items.js';
import { saveItem } from '../controllers/items.js';


const router = express.Router();
router.get('/addItem/',(req, res) => {
    const refererPath = new URL(req.get("Referrer")).pathname;
    res.redirect(refererPath + "?addItem=true");
  })
router.get('/editItem/:itemId', (req, res) => {
  const { itemId } = req.params;
  const refererPath = new URL(req.get("Referrer")).pathname;  
  res.redirect(refererPath + "?editItem=" + itemId);
})

router.post("/saveItem", checkItemSchema,saveItem);
export default router;