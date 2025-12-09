const jwt = require('jsonwebtoken');
const { httpError } = require('../utils/errors');

class AuthService {
  constructor({ jwtSecret = process.env.JWT_SECRET || 'dev-secret' } = {}) {
    this.jwtSecret = jwtSecret;
    this.usersByEmail = new Map();
    this.usersById = new Map();
    this.idCounter = 1;
  }

  getOrCreateUser(email) {
    if (!email) {
      throw httpError.badRequest('email is required');
    }

    const normalizedEmail = email.toLowerCase();
    const existing = this.usersByEmail.get(normalizedEmail);

    if (existing) {
      return existing;
    }

    const user = { id: `user-${this.idCounter++}`, email: normalizedEmail };
    this.usersByEmail.set(normalizedEmail, user);
    this.usersById.set(user.id, user);
    return user;
  }

  findById(userId) {
    return this.usersById.get(userId);
  }

  createToken(user) {
    return jwt.sign(
      { sub: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  login(email) {
    const user = this.getOrCreateUser(email);
    const token = this.createToken(user);

    return { user, token };
  }

  verifyToken(token) {
    return jwt.verify(token, this.jwtSecret);
  }
}

module.exports = AuthService;
