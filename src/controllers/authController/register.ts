import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import { create } from "../../service/userServices/create";

const salt = 10;

type Body = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const register: RequestHandler = async (req, res) => {
    const body = req.body as Body;
    
    if (body.password !== body.repeatPassword) {
        return res.status(400).json({
            message: "password does not match"
        })
    }
    
    const hash = bcrypt.hashSync(body.password, salt)
    
    try {
        await create({
            password: hash,
            email: body.email,
            name: body.name
        });
        res.status(201).json("¡Your account has been created succesfully!")
    } catch (err) { res.status(400).json(err); };
}

export default register