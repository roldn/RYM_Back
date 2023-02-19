import * as Service from "../../service/characterServices/charServices"
import { RequestHandler } from "express";
import { Character } from "@prisma/client";

export const getCharaterList: RequestHandler = async (req, res) => {
  try {
    const url: string = process.env.CLIENT_URL!.toString();
    const charsPerPage: number = Number(process.env.CHAR_PER_PAGE);
    const page: number = Number(req.query.page) || 1;  delete req.query.page;
    const querys = { ...req.query };

    const amountOfPages = await Service.getAllPages(req, charsPerPage);

    let characters: Character[] = [];
    if (Object.keys(querys).length > 0) {
      characters = await Service.filter(querys, page, charsPerPage);
    } else {
      characters = await Service.getAll(page, charsPerPage);
    }

    // pagination
    let isNext: (string | null) = '';
    if (page == (characters.length / charsPerPage)) {
      isNext = url + `${page + 1}`;
      if (Object.keys(querys).length = 0) {
        isNext += `${{ ...querys }}`
      };
    } else { isNext = null; }

    let isPrev: (string | null) = '';
    if (page > 1) {
      isPrev = url + `${page - 1}`
      if (Object.keys(querys).length = 0) {
        isPrev += `${{ ...querys }}`
      };
    } else { isPrev = null }

    const finalObject = {
      info: {
        "count": amountOfPages,
        "pages": Math.round((amountOfPages / charsPerPage)),
        "next": isNext,
        "prev": isPrev,
      },
      results: characters
    };
    res.status(200).send(finalObject);
  } catch (err) {
    console.log("Line 50, 'getCharaterList' controller, 'characterControllers' folder")
    const error = err as { message?: string }
    res.status(400).json({ message: error?.message })
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    const file = req.file;
    const imageName = file!.filename;

    const character: Character = req.body;

    await Service.create(character, imageName);

    res.status(201).send({
      message: "Successfully created",
      IsSuccess: true,
    });
  } catch (err) {
    console.log("Line 73, 'create' controller, 'characterControllers' folder")
    const error = err as { message?: string }
    res.status(400).json({ message: error?.message })
  }
};

export const update: RequestHandler = async (req, res) => {
  try {

    if (!req.body) throw new Error("we can't modify the caracter if you don't send any data first")

    const updatedCharacter: Character = req.body;
    const selectedId: number = parseInt(req.params.id);

    await Service.update(selectedId, updatedCharacter);

    res.status(200).send({
      message: "Successfully updated",
      IsSuccess: true,
    });

  } catch (err) {
    console.log("Line 99, 'update' controller, 'characterControllers' folder")
    const error = err as { message?: string }
    res.status(400).json({ message: error?.message })
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
    const characterId: number = Number(req.params.id);
    await Service.remove(characterId);
    res.status(200).send({
      message: "Successfully deleted",
      IsSuccess: true,
    });
  } catch (err) {
    console.log("Line 114, 'remove' controller, 'characterControllers' folder")
    const error = err as { message?: string }
    res.status(400).json({ message: error?.message })
  }
};