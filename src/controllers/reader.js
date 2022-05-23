const { Reader } = require('../models');

exports.create = async (req, res) => {
    try {
        const newReader = await Reader.create(req.body);
        res.status(201).json(newReader);
    } catch (err) {
        res.status(500).json(err.message);
    };
}

exports.read = async (req, res) => {
    try {
        const result = await Reader.findAll()
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message);
    };
}

exports.readById = async (req, res) => {
    try {
        const result = await Reader.findByPk(req.params.id)
        if (result != null) { res.status(200).json(result) }
        else {
            res.status(404).send({ 'error': 'The reader could not be found.' })
        }
    } catch (err) {
        res.status(500).json(err.message);
    };
}

exports.update = async (req, res) => {
    try {
        const newData = req.body
        const target = req.params.id
        const update = await Reader.update(newData, { where: { id: target }, })
        if (update != 0) {
            res.status(200).send(`update complete`)
        }
        else {
            res.status(404).send({ 'error': 'The reader could not be found.' })
        }
    } catch (err) {
        res.status(500).json(err.message);;
    }
};

exports.delete = async (req, res) => {
    try {
        const target = req.params.id
        const update = await Reader.destroy({ where: { id: target } })
        if (!!update) {
            res.status(204).json(`record ${req.params.id} has been deleted.`)
        }
        else {
            res.status(404).send({ 'error': 'The reader could not be found.' })
        }
    } catch (err) {
        res.status(500).json(err.message);;
    }
}

