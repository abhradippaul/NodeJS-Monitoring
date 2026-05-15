import { Router } from 'express';
import { register, login, logout, updateUser, deleteUser } from '../controllers/auth.controller.js';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
