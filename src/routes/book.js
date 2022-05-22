const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.post('/', bookController.create);
router.get('/', bookController.read)
router.get('/:id', bookController.readById)


module.exports = router;