import { Router } from "express";
const router = Router();
import Controllers from '../controllers/index.js'

router.post('/login', Controllers.Auth.login);
router.post('/signUp', Controllers.Auth.signUp);

export default router;