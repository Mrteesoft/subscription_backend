const AuthService = require('./authService');
const SubscriptionService = require('./subscriptionService');

// Use AuthService's internal default unless an explicit secret is provided via env
const authService = new AuthService({ jwtSecret: process.env.JWT_SECRET || undefined });
const subscriptionService = new SubscriptionService({ defaultBalance: 5 });

module.exports = { authService, subscriptionService };
