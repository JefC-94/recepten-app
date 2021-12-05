const knex = require('../../db')

const getTypes = async (req, res) => {
  knex('type')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getType = async (req, res) => {
  knex('type')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createType = async (req, res) => {
  knex('type')
    .insert({
      name: req.body.name,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateType = async (req, res) => {
  knex('type')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
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

const deleteType = async (req, res) => {
  knex('type')
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
  getTypes,
  getType,
  createType,
  updateType,
  deleteType,
}
