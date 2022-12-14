import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors";
import petsRouter from "./routers/petsRouter";
import usersRouter from "./routers/usersRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/pets", petsRouter);
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
