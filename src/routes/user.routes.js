import { Router } from "express";
const router = Router();
import Controllers from '../controllers/index.js'

router.get('/getUserByToken/:token', Controllers.User.getUserByToken);

export default router;