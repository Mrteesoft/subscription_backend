const { z } = require('zod');

const subscriptionParamsSchema = z.object({
  userId: z.string().min(1, 'is required'),
});

module.exports = { subscriptionParamsSchema };
