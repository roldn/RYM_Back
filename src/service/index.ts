import { PrismaClient } from "@prisma/client";
import { Character } from "../model/characters";

const prisma = new PrismaClient()

//CRUD Operations
export const getAll = async (req: any): Promise<Character[]> => {
    const results: Character[] = await prisma.character.findMany({
        skip: parseInt(req.query.page) * 2,
        take: 2,
    });
    return results
};

export const filter = async (req: any): Promise<Character[]> => {
    const page: number = req.query.page;
    delete req.query.page;
    const results: Character[] = await prisma.character.findMany({
        skip: page * 2,
        take: 2,
        where: { ...req.query }
    });
    return results
}

export const create = async (character: Character): Promise<void> => {
    const create = await prisma.character.create({
        data: {
            name: character.name,
            gender: character.gender,
            status: character.status,
            image: character.image
        }
    });
}

export const update = async (selectedId: number, updatedCharacter: Character): Promise<void> => {
    const updateCharacter = await prisma.character.update({
        where: {
            id: selectedId
        },
        data: { ...updatedCharacter },
    })
}

export const remove = async (id_character: number): Promise<void> => {
    const deleteCharacter = await prisma.character.delete({
        where: {
            id: id_character,
        },
    })
}