import { Router } from "express";
const router = Router();


router.get('/', function(req, res) {
  res.send('DOC-DOC API VERSION 1.0.0');
});

export default router;