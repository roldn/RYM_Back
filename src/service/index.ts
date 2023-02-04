import { Character, characters } from "../model/characters";

export const getAll = async (): Promise<Character[]> => {
    return characters;
  };

export const create = async (character:Character): Promise<void> => { 
    characters.push(character);  
}

export const update = async (character:Character): Promise<void> => { 
    let index = characters.findIndex(d => d.id === character['id']);
    if(index >0 || index==0)
   {
    characters[index]['name'] = character['name'];
    characters[index]['status'] = character['status'];
    characters[index]['specie'] = character['specie'];
    characters[index]['gender'] = character['gender'];
    characters[index]['image'] = character['image'];
    characters[index]['url'] = character['url'];
   }
}

export const remove = async (id:number): Promise<void> => { 
    console.log(`in delete character index is ${JSON.stringify(id)}`)
    let index = characters.findIndex(d => d.id === id);
    console.log(`in delete character index is ${index}`)
    if(index >0 || index==0)
    characters.splice(index, 1);
    
}