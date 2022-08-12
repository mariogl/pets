import "../../loadEnvironment";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";
import { ValidationError } from "express-validation";
import CustomError from "../../types/error";

const debug = Debug("pets-api:server:middlewares:errors");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorStatus = error.statusCode ?? 500;
  let errorMessage = error.publicMessage ?? "General pete";

  if (error instanceof ValidationError) {
    debug(chalk.red("Request validation errors: "));
    error.details.body.forEach((errorInfo) => {
      debug(chalk.red(errorInfo.message));
    });

    errorMessage = "Wrong data";
  }

  debug(chalk.red("Error: ", error.message));

  res.status(errorStatus).json({ error: errorMessage });
};
