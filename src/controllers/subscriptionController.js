const { subscriptionService } = require('../services');

const createSubscription = (req, res) => {
  const subscription = subscriptionService.createSubscription(req.user.id);
  res.status(201).json(subscription);
};

const getBalance = (req, res) => {
  const { userId } = req.params;
  const subscription = subscriptionService.getBalance(userId);
  res.json(subscription);
};

const consumeVideo = (req, res) => {
  const { userId } = req.params;
  const subscription = subscriptionService.consumeVideo(userId);
  res.json(subscription);
};

module.exports = { createSubscription, getBalance, consumeVideo };
