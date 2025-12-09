const logger = require('../logger');

function errorLogger(err, req, res, next) {
  const status = err.statusCode || res.statusCode || 500;
  logger.error('Request error', {
    status,
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: err.stack,
    userId: req.user?.id || undefined,
  });

  next(err);
}

module.exports = errorLogger;
