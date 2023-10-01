import { HttpError } from "../helpers/index.js";

const validator = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing required name field"));
    }
    next();
  };

  return func;
};

export default validator;
