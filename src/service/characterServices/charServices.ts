import { Character } from "@prisma/client";
import { prisma } from "..";

export const getAllPages = async (req: any, perPage: number): Promise<number> => {
    const characters: Character[] = await prisma.character.findMany({
        where: { ...req.query }
    });

    const amountOfPages = characters.length / perPage
    return amountOfPages
};

//CRUD Operations
export const getAll = async (page: number, perPage: number): Promise<Character[]> => {
    let skip:number = (page-1) * perPage ;
    const characters: Character[] = await prisma.character.findMany({
        skip: skip,
        take: perPage,
    });
    return characters
};

export const filter = async (req: any, page: number, perPage: number): Promise<Character[]> => {
    let skip:number = (page-1) * perPage ;
    const characters: Character[] = await prisma.character.findMany({
        skip: skip,
        take: perPage,
        where: { ...req.query }
    });
    return characters
}

export const create = async (character: Character, imageName: string): Promise<void> => {
    await prisma.character.create({
        data: {
            name: character.name,
            gender: character.gender,
            status: character.status,
            image: imageName
        },
        select: {
            id: true,
            name: true,
            gender: true,
            status: true,
            image: true,
            createdAt: true,
            updatedAt: false
        }
    });
}

export const update = async (selectedId: number, updatedCharacter: Character): Promise<void> => {
    await prisma.character.update({
        where: { id: selectedId },
        data: { ...updatedCharacter },
        select: {
            id: true,
            name: true,
            gender: true,
            status: true,
            image: true,
            updatedAt: true,
            createdAt: false
        }
    })
}

export const remove = async (id_character: number): Promise<void> => {
    await prisma.character.delete({
        where: {
            id: id_character,
        },
    })
}