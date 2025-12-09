const { httpError } = require('../utils/errors');

const validate = (schema, property = 'body') => (req, res, next) => {
  const target = req[property];
  const result = schema.safeParse(target);

  if (!result.success) {
    const message = result.error.errors
      .map((err) => {
        const path = err.path.length ? err.path.join('.') : property;
        return `${path} ${err.message}`;
      })
      .join('; ');

    return next(httpError.badRequest(message, 'VALIDATION_ERROR'));
  }

  req[property] = result.data;
  return next();
};

module.exports = validate;
