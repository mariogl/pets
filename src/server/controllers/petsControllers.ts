import { NextFunction, Request, Response } from "express";
import Pet from "../../database/models/Pet";
import createCustomError from "../../utils/errors";

export const getPets = async (req: Request, res: Response) => {
  const pets = await Pet.find();

  res.status(200).json({ pets });
};

export const createPet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet = req.body;

    const newPet = await Pet.create(pet);

    res.status(201).json({ pet: newPet });
  } catch (error) {
    const customError = createCustomError(
      400,
      error.message,
      "Error on creating the new pet"
    );

    next(customError);
  }
};
