import * as Service from "../service/index"
import { Character } from '../model/characters';

export const getSet = async (req: number, res: any) => {
  const characterList: Character[] = await Service.getSet();
  try {
    res.status(200).send(
      characterList);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const create = async (req: any, res: any) => {
  const character: Character = req.body;
  await Service.create(character);
  try {
    res.status(200).send({
      message: "Successfully added",
      IsSuccess: true,
      result: ""
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const update = async (req: any, res: any) => {
  const character: Character = req.body;
  await Service.update(character);
  try {
    res.status(200).send({
      message: "Successfully updated",
      IsSuccess: true,
      result: ""
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const remove = async (req: any, res: any) => {
  const characterId: string = req.body['id'];
  await Service.remove(characterId);
  try {
    res.status(200).send({
      message: "Successfully deleted",
      IsSuccess: true,
      result: ""
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};