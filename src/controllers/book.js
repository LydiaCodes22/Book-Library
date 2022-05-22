const { Book } = require('../models');

exports.create = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json(err);
    };
}

exports.read = async (req, res) => {
    try {
        const result = await Book.findAll()
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.readById = async (req, res) => {
    try {
        const result = await Book.findByPk(req.params.id)
        if (result != null) { res.status(200).json(result) }
        else {
            res.status(404).send({ 'error': 'No such book in the database' })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
