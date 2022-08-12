import "../loadEnvironment";
import Debug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = Debug("pets-api:database:index");

const connectDB = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to Database"));
        reject(error);
        return;
      }

      debug(chalk.green("Connected to Database"));
      resolve(true);
    });
  });

export default connectDB;
