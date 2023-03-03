import { Router } from "express";
import getMe from "../controllers/meController/getMe";
import checkLogin from "../middleware/checkAuth";

const meRouter = Router();

meRouter.get("/", checkLogin, getMe);

export default meRouter;