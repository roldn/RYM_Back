import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from "express";
import { findUser } from '../../service/userServices/findUser';

type Body = {
    name: string;
    email: string;
    password: string;
}

const login: RequestHandler = async (req, res) => {

    const body = req.body as Body;

    try {
        const [user] = await findUser(body.email)

        if (!user) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        const isSame = bcrypt.compareSync(body.password, user.password)

        if (isSame) {
            const payload = {
                email: user.email,
                id: user.id,
            };

            const secret = process.env.SECRET_JWT!.toString()

            const token = jwt.sign(payload, secret);

            return res.status(200).json({
                payload: {
                    token,
                }
            });
        } else {
            return res.status(400).json({ message: "invalid credentials" })
        }
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

export default login