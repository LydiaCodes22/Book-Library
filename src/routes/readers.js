const express = require('express');

const readersController = require('../controllers/readers');

const router = express.Router();

router.post('/readers', readersController.create);

module.exports = router;