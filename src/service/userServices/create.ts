import { prisma } from '..';

type NewUser = {
    name: string | null
    email: string
    password: string
}

export const create = async (user: NewUser): Promise<void> => {
    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password
        },
        select: {
            id: true,
            email: true,
            password: true,
            name: true,
            createdAt: true,
            isAdmin: true
        },
    });
}

// export const update = async (selectedId: number, updatedCharacter: Character): Promise<void> => {
//     const updateCharacter = await prisma.user.update({
//         where: {
//             id: selectedId
//         },
//         data: { ...updatedCharacter },
//     })
// }

// export const remove = async (id_character: number): Promise<void> => {
//     const deleteCharacter = await prisma.user.delete({
//         where: {
//             id: id_character,
//         },
//     })
// }