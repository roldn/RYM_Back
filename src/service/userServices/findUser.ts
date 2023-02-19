import { User } from "@prisma/client";
import { prisma } from "..";

export const findUser = async (email : string): Promise<User[]> => {

    const user: User[] = await prisma.user.findMany({
        where:{
            email: email
        }
    });

    return user
};

export const findById = async (id : string): Promise<User[]> => {

    const user: User[] = await prisma.user.findMany({
        where:{
            id: id
        }
    });

    return user
};