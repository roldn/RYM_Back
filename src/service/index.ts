import { PrismaClient } from "@prisma/client";
import { Character } from "../model/characters";

const prisma = new PrismaClient()

//CRUD Operations
export const getSet = async (): Promise<Character[]> => {
    const results: Character[] = await prisma.character.findMany()
    console.log(results)

    return results
};

export const create = async (character: Character): Promise<void> => {
    const create = await prisma.character.create({
        data: {
            name: character.name,
            gender: character.gender,
            status: character.status
        }
    });
    console.log(create)
}

export const update = async (character: Character): Promise<void> => {
    const updateCharacter = await prisma.character.updateMany({
        where: {
            id: {
                contains: `${character.id}`,
            },
        },
        data: { ...character },
    })
}

export const remove = async (id_character: string): Promise<void> => {
    const deleteCharacter = await prisma.character.delete({
        where: {
            id: id_character,
        },
    })
}

//Filter Operations
// export const filterBy = async (character:Character, next:number): Promise<Character[]> => {

//     async function main() {

//         await prisma.$connect()

//         const results = await prisma.character.findMany({
//             skip: next,
//             take: 8,
//             where: {
//                 email: {
//                     contains: 'Prisma',
//                 },
//             },
//             orderBy: {
//                 name: 'desc',
//             },
//         })

//         //     const characters = await prisma.character.findMany();
//         //     console.log(characters)

//         return results
//     }

//     main().then(
//         async () => {
//             await prisma.$disconnect()
//         }
//     ).catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })
// };