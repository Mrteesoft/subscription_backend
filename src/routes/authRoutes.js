const express = require('express');
const { login } = require('../controllers/authController');
const routeHandler = require('../utils/routeHandler');

const router = express.Router();

router.post('/login', routeHandler(login));

module.exports = router;
