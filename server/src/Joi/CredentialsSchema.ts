import Joi from "joi";

export const CredentialSchema = Joi.object({
  siteName: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});
