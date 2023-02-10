import * as Service from "../service/index"
import { Character } from '../model/characters';
import { RequestHandler } from "express";

export const getSet:RequestHandler = async (req, res) => {

  let getThis:Character[] = [];

  if(Object.keys(req.query).length > 1){
    getThis = await Service.filter(req);
  }else{
    getThis = await Service.getAll(req);
  }

  const characterList: Character[] = getThis;

  try {
    res.status(200).send(
      characterList);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const create:RequestHandler = async (req, res) => {
  const character: Character = req.body;
  await Service.create(character);
  try {
    res.status(200).send({
      message: "Successfully added",
      IsSuccess: true,
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const update:RequestHandler = async (req, res) => {
  
  const updatedCharacter: Character = req.body;
  const selectedId:number = parseInt(req.params.id);
  await Service.update(selectedId, updatedCharacter);
  try {
    res.status(200).send({
      message: "Successfully updated",
      IsSuccess: true,
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const remove:RequestHandler = async (req, res) => {
  const characterId:number = Number(req.params.id);
  await Service.remove(characterId);
  try {
    res.status(200).send({
      message: "Successfully deleted",
      IsSuccess: true,
    });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const filter:RequestHandler = async (req, res) => {
  console.log(req.query.params)
  try {
    res.status(200).send({
      message: "all O.K."
    });
  } catch (e:any){
    res.status(404).send(
      e.message
    );
  }
};