import { Router } from 'express';
import uploadFile from '../middleware/multerS3';
import authRouter from './authRouter';
import charRouter from './charRouter';
import meRouter from './meRouter';

const appRouter = Router();

appRouter.get('/', (_req, res) => res.send('Welcome to NodeJs App using TypeScript'));

// appRouter.use('/testmulters3', uploadFile.single('characterImage'), function(req, res, next) {
//     console.log(req);
//     res.status(200).send( console.log(req) );
// });


appRouter.use('/me', meRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/characters', charRouter);

export default appRouter