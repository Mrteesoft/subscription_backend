const logger = require('../logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    logger.info('Request completed', {
      status,
      method: req.method,
      path: req.originalUrl,
      durationMs: duration,
      userId: req.user?.id || undefined,
    });
  });

  next();
}

module.exports = requestLogger;
