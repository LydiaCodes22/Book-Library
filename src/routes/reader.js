const express = require('express');

const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/', readerController.create);
router.get('/', readerController.read);
router.get('/:id', readerController.readById)
router.patch('/:id', readerController.update)
router.delete('/:id', readerController.delete)

module.exports = router;