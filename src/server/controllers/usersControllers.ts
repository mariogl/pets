import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import createCustomError from "../../utils/errors";

export const dumbMiddleware = (req: Request, res: Response) => {
  res.json({ message: "Shegó" });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      const customError = createCustomError(
        400,
        "User already exists",
        "User already exists"
      );

      throw customError;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      const customError = createCustomError(
        400,
        "User not found",
        "Wrong credentials"
      );

      throw customError;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = createCustomError(
        400,
        "Invalid password",
        "Wrong credentials"
      );

      throw customError;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
