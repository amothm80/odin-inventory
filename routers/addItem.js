import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  const refererPath = new URL(req.get("Referrer")).pathname;
  res.redirect(refererPath + "?addItem=true");
});
export default router;
