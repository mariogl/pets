import { Joi } from "express-validation";

const userCredentialsSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  }),
};

export default userCredentialsSchema;
