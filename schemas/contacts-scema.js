import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp("^\\(\\d{3}\\)\\d{3}-\\d{4}$")),
});
