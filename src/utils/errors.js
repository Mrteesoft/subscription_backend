class AppError extends Error {
  constructor(message, statusCode = 500, code) {
    super(message);
    this.statusCode = statusCode;
    if (code) {
      this.code = code;
    }
  }
}

const httpError = {
  badRequest: (message, code) => new AppError(message, 400, code),
  unauthorized: (message, code) => new AppError(message, 401, code),
  forbidden: (message, code) => new AppError(message, 403, code),
  notFound: (message, code) => new AppError(message, 404, code),
};

module.exports = { AppError, httpError };
