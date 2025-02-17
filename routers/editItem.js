import express from "express";
import { getItemById } from "../controllers/items.js";

const router = express.Router();
// router.use("/:itemId", getItemById);
router.get("/:itemId", (req, res) => {
    const {itemId} = req.params
  const refererPath = new URL(req.get("Referrer")).pathname;

  res.redirect(refererPath+"?editItem="+itemId);
});
export default router;
