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
        if (result != null) {
            await
                res.status(200).json(result)
        }
        else {
            res.status(404).send({ 'error': 'No such book in the database' })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {

    try {
        const newData = req.body
        const target = req.params.id
        const update = await Book.update(newData, { where: { id: target }, })
        if (update != 0) {
            res.status(200).send(`The book has been updated`)
        }
        else {
            res.status(404).send({ 'error': 'No such book in the database' })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const target = req.params.id
        const deletedBook = await Book.destroy({ where: { id: target }, })
        if (deletedBook != 0) {
            res.status(204).send(`The book has been deleted`)
        }
        else {
            res.status(404).send({ 'error': 'No such book in the database' })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
