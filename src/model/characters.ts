export interface Character {
    id?:number | null;
    name: string;
    status:string;
    specie:string;
    gender: string;
    image: string;
    url: string;
}

export const characters: Character[] = [
    {
        id: 1,
        name: 'Morty',
        status: 'dead',
        specie:'human',
        gender: 'male',
        image: 'aaa',
        url: 'aaaa',
    },
];