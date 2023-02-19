import login from '../controllers/authController/login';
import register from '../controllers/authController/register';
import { Router } from 'express';

const authRouter = Router()

authRouter.post('/register', register);
authRouter.get('/login', login);

export default authRouter

