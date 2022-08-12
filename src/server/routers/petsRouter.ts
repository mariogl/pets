import express from "express";
import { getPets, createPet } from "../controllers/petsControllers";

const petsRouter = express.Router();

petsRouter.get("/", getPets);
petsRouter.post("/new-pet", createPet);

export default petsRouter;
