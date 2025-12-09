const { createLogger, format, transports } = require('winston');

const consoleFormat = format.printf(
  ({ timestamp, level, message, stack, status, method, path, durationMs, userId, ...rest }) => {
    const orderedMeta = {
      status,
      method,
      path,
      durationMs,
      userId,
      ...rest,
    };

    const metaParts = Object.entries(orderedMeta)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${value}`);

    const meta = metaParts.length ? ` ${metaParts.join(' ')}` : '';

    if (stack) {
      return `${timestamp} [${level}] ${message}${meta}\n${stack}`;
    }

    return `${timestamp} [${level}] ${message}${meta}`;
  }
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    consoleFormat
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
