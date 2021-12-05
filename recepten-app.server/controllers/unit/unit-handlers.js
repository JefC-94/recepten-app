const knex = require('../../db')

const getUnits = async (req, res) => {
  knex('unit')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getUnit = async (req, res) => {
  knex('unit')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createUnit = async (req, res) => {
  knex('unit')
    .insert({
      name: req.body.name,
      name_plural: req.body.name_plural,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateUnit = async (req, res) => {
  knex('unit')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
      name_plural: req.body.name_plural,
    })
    .returning('id')
    .then(data => {
      if (data.length) {
        return res.status(200).send(JSON.stringify(data))
      } else {
        return res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
}

const deleteUnit = async (req, res) => {
  knex('unit')
    .where('id', req.params.id)
    .del()
    .returning('id')
    .then(data => {
      if (data.length) {
        return res.status(200).send(JSON.stringify(data))
      } else {
        return res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports = {
  getUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
}
