const express = require('express');
const router = express.Router();
const { getProducts } = require('./productcontroller');

router.get('/', getProducts);

module.exports = router;
