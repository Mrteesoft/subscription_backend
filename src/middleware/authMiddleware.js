const logger = require('../logger');
const { authService } = require('../services');
const { httpError } = require('../utils/errors');

function authMiddleware(req, _res, next) {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return next(httpError.unauthorized('Authorization header missing or invalid'));
  }

  const token = header.slice('Bearer '.length).trim();

  try {
    const payload = authService.verifyToken(token);
    const user = authService.findById(payload.sub);

    if (!user) {
      return next(httpError.unauthorized('User not found for token'));
    }

    req.user = user;
    next();
  } catch (error) {
    logger.warn('authentication failed', { message: error.message });
    next(httpError.unauthorized('Invalid token'));
  }
}

module.exports = authMiddleware;
