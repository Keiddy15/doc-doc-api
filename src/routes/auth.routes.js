import { Router } from "express";
const router = Router();
import Controllers from '../controllers/index.js'

router.post('/login', Controllers.Auth.login);
router.post('/register', Controllers.Auth.register);

export default router;