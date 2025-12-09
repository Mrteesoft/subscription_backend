const logger = require('../logger');

function errorLogger(err, req, res, next) {
  logger.error('request error', {
    method: req.method,
    path: req.originalUrl,
    status: res.statusCode,
    message: err.message,
    stack: err.stack,
    userId: req.user?.id || null,
  });

  next(err);
}

module.exports = errorLogger;
