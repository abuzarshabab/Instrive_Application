const Joi = require('joi')

const applicationSchem = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required()
});

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      const validated = await applicationSchem.validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }))
      next(createHttpError(500))
    }
  }
}

