
import { Router } from 'express';
import authRouter from './authRouter';
import charRouter from './charRouter';

const appRouter = Router();

appRouter.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));

appRouter.use('/auth', authRouter);
appRouter.use('/characters', charRouter);

export default appRouter