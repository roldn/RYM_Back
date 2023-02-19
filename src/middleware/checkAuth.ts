import { RequestHandler } from "express"
import jwt from 'jsonwebtoken';
import { findById } from "../service/userServices/findUser";

type Payload = {
    email: string,
    id: string,
}

const checkLogin: RequestHandler = (req, res, next) => {
    try {

        if (!req.headers.authorization) throw new Error("invalid request");

        const token = req.headers.authorization;
        // const secret = process.env.SECRET!

        // console.log(secret)

        const payload = jwt.verify(token.split("Bearer ")[1], 'Abril1742331347$') as Payload;
        const user = findById(payload.id);

        if (!user) throw new Error("invalid user")
        console.log("decoded", payload)

        res.locals.user = user

        next();
    } catch (err) {
        console.log("Line 30 checkAuth, 'middleware' folder")
        const error = err as { message?: string }
        res.status(400).json({ message: error?.message })
    }
}

export default checkLogin