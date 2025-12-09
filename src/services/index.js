const AuthService = require('./authService');
const SubscriptionService = require('./subscriptionService');

// Use AuthService's internal default unless an explicit secret is provided via env
const authService =
  process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length > 0
    ? new AuthService({ jwtSecret: process.env.JWT_SECRET })
    : new AuthService();
const subscriptionService = new SubscriptionService({ defaultBalance: 5 });

module.exports = { authService, subscriptionService };
