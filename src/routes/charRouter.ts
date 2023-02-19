import uploadFile from "../middleware/uploadFile";
import * as crud from '../controllers/characterController/crudController';
import { Router } from 'express';
import checkLogin from "../middleware/checkAuth";

const charRouter = Router();

charRouter.get('/', crud.getCharaterList);
charRouter.post('/create', checkLogin, uploadFile.single("characterImage"), crud.create);
charRouter.put('/update/:id', checkLogin, crud.update);
charRouter.delete('/remove/:id', checkLogin, crud.remove);

export default charRouter