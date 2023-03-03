import * as crud from '../controllers/characterController/crudController';
import { Router } from 'express';
import checkLogin from "../middleware/checkAuth";
import uploadFile from '../middleware/multerS3';
//import uploadFile from "../middleware/uploadFile";

const charRouter = Router();

charRouter.get('/', crud.getCharaterList);
charRouter.get('/:id', crud.getById);
charRouter.post('/create', checkLogin, uploadFile.single('characterImage'), crud.create);
charRouter.put('/update/:id', checkLogin, crud.update);
charRouter.delete('/remove/:id', checkLogin, crud.remove);

export default charRouter

// uploadFile.single("characterImage")