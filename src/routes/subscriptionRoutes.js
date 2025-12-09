const express = require('express');
const { createSubscription, getBalance, consumeVideo } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const ensureUserMatch = require('../middleware/ensureUserMatch');
const validate = require('../middleware/validate');
const routeHandler = require('../utils/routeHandler');
const { subscriptionParamsSchema } = require('../validation/subscriptionSchemas');

const router = express.Router();

router.use(authMiddleware);
router.post('/subscriptions', routeHandler(createSubscription));

router.use('/subscriptions/:userId', validate(subscriptionParamsSchema, 'params'), ensureUserMatch);
router.get('/subscriptions/:userId/balance', routeHandler(getBalance));
router.post('/subscriptions/:userId/consume', routeHandler(consumeVideo));

module.exports = router;
