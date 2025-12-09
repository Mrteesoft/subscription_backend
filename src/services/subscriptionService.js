const { httpError } = require('../utils/errors');

class SubscriptionService {
  constructor({ defaultBalance = 5 } = {}) {
    this.defaultBalance = defaultBalance;
    this.subscriptions = new Map();
  }

  createSubscription(userId) {
    this.#assertUserId(userId);

    const existing = this.subscriptions.get(userId);
    if (existing) {
      return this.#clone(existing);
    }

    const record = { userId, balance: this.defaultBalance };
    this.subscriptions.set(userId, record);
    return this.#clone(record);
  }

  getBalance(userId) {
    this.#assertUserId(userId);

    const record = this.subscriptions.get(userId);
    if (!record) {
      throw httpError.notFound('Subscription not found');
    }

    return this.#clone(record);
  }

  consumeVideo(userId) {
    this.#assertUserId(userId);

    const record = this.subscriptions.get(userId);

    if (!record) {
      throw httpError.notFound('Subscription not found');
    }

    if (record.balance <= 0) {
      throw httpError.badRequest('No videos remaining', 'NO_BALANCE');
    }

    record.balance -= 1;
    this.subscriptions.set(userId, record);
    return this.#clone(record);
  }

  #assertUserId(userId) {
    if (!userId) {
      throw httpError.badRequest('userId is required');
    }
  }

  #clone(record) {
    return { ...record };
  }
}

module.exports = SubscriptionService;
