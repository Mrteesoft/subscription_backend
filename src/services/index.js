const AuthService = require('./authService');
const SubscriptionService = require('./subscriptionService');

const authService = new AuthService({ jwtSecret: process.env.JWT_SECRET });
const subscriptionService = new SubscriptionService({ defaultBalance: 5 });

module.exports = { authService, subscriptionService };
