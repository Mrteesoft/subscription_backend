const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const { httpError } = require('./utils/errors');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/api/auth', authRoutes);
app.use('/api', subscriptionRoutes);

app.use((req, _res, next) => {
  next(httpError.notFound('Not Found'));
});

app.use(errorLogger);

app.use((err, req, res, _next) => {
  const status = err.statusCode || 500;
  const body = { message: err.message || 'Internal Server Error' };

  if (err.code) {
    body.code = err.code;
  }

  res.status(status).json(body);
});

module.exports = app;
