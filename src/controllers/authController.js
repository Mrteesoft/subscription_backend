const { authService } = require('../services');
const { httpError } = require('../utils/errors');

const login = (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw httpError.badRequest('email is required');
  }

  const { user, token } = authService.login(email);
  res.json({ user, token });
};

module.exports = { login };
