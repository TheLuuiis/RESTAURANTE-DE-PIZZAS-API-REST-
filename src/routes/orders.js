const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orders');

router.post('/', createOrder);

module.exports = router;
