import { Router } from "express";
const router = Router();
import Controllers from '../controllers/index.js'

router.get('/getUserByToken/:token', Controllers.User.getUserByToken);
router.get('/getAll', Controllers.User.getAllUsers);
router.put('/update/', Controllers.User.updateUser);

export default router;