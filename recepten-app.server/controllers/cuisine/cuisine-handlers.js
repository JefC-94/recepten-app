const knex = require('../../db')

const getCuisines = async (req, res) => {
  knex('cuisine')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCuisine = async (req, res) => {
  knex('cuisine')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createCuisine = async (req, res) => {
  knex('cuisine')
    .insert({
      name: req.body.name,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateCuisine = async (req, res) => {
  knex('cuisine')
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

const deleteCuisine = async (req, res) => {
  knex('cuisine')
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
  getCuisines,
  getCuisine,
  createCuisine,
  updateCuisine,
  deleteCuisine,
}
