const { httpError } = require('../utils/errors');

function ensureUserMatch(req, _res, next) {
  const { userId } = req.params;

  if (!userId) {
    throw httpError.badRequest('userId param is required');
  }

  if (!req.user || req.user.id !== userId) {
    throw httpError.forbidden('Forbidden: user mismatch');
  }

  next();
}

module.exports = ensureUserMatch;
