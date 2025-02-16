import express from "express";

const router = express.Router();
router.post("/", (req, res) => {
  console.log(req)
  const refererPath = new URL(req.get("Referrer")).pathname;
  res.redirect(refererPath);
});
export default router;
