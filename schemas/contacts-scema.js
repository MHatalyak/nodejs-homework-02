import Joi from "joi";

const messagesErrors = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
  "any.required": "missing required {#label} field",
};

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp("^\\(\\d{3}\\) \\d{3}-\\d{4}$")),
})
  .unknown(false)
  .messages(messagesErrors);
