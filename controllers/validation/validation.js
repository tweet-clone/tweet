const Joi = require('joi');

module.exports = {
  Joi,
  signUpSchema: Joi.object({
    email: Joi.string()
      .required()
      .min(10)
      .max(25)
      // .pattern(/^[a-zA-Z0-9!@#$%^&*]{4,20}$/),
      // .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$')),
      ,
    nickname: Joi.string()
      .required()
      .min(1)
      .max(10)
      // .pattern(/^[a-zA-Z0-9가-힣]{1,10}$/),
      ,
    password: Joi.string()
      .required()
      .min(4)
      .max(18)
      // .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,18}$/),
      ,
  }),
};
