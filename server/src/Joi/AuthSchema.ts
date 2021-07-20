import Joi from "joi";

export const AuthSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  fullName: Joi.string().min(3).max(50).required(),
  password: Joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).+$")),
});
