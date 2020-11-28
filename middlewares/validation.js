const { celebrate, Joi, CelebrateError } = require('celebrate');
const isURL = require('validator/lib/isURL');

const urlValidation = (value) => {
  if (!isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const idUserValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

const idCardValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validationUpdProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationUpdAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation),
  }),
});

const validationDataUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const validationDataCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidation),
  }),
});

module.exports = {
  idUserValidation,
  idCardValidation,
  validationDataCard,
  validationDataUser,
  validationUpdAvatar,
  validationUpdProfile,
};
