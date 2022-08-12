import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  chip: {
    type: String,
    required: true,
    unique: true,
  },
});

const Pet = model("Pet", petSchema, "pets");

export default Pet;
