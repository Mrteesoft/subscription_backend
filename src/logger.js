const { createLogger, format, transports } = require('winston');

const consoleFormat = format.printf(({ timestamp, level, message, stack, ...meta }) => {
  const metaParts = Object.entries(meta)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`);

  const details = metaParts.length ? ` | ${metaParts.join(' ')}` : '';
  const base = `${timestamp} ${level.toUpperCase()} ${message}${details}`;

  return stack ? `${base}\n${stack}` : base;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.colorize({ all: true }),
    consoleFormat
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
