function routeHandler(handler) {
  return (req, res, next) => {
    try {
      const maybePromise = handler(req, res, next);
      if (maybePromise && typeof maybePromise.then === 'function') {
        maybePromise.catch(next);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = routeHandler;
