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

    const existing = this.usersByEmail.get(email);
    if (existing) {
      return { ...existing };
    }

    const user = {
      id: `user-${this.idCounter++}`,
      email,
    };

    this.usersByEmail.set(email, user);
    this.usersById.set(user.id, user);

    return { ...user };
  }

  findById(id) {
    if (!id) return null;
    const user = this.usersById.get(id);
    return user ? { ...user } : null;
  }

  createToken(user) {
    if (!user || !user.id) {
      throw httpError.badRequest('valid user required to create token');
    }

    const payload = { sub: user.id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
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
