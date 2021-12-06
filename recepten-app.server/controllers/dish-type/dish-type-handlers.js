const knex = require('../../db')

const getDishTypes = async (req, res) => {
  knex('dish_type')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getDishType = async (req, res) => {
  knex('dish_type')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createDishType = async (req, res) => {
  knex('dish_type')
    .insert({
      dish_id: req.body.dish_id,
      type_id: req.body.type_id,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateDishType = async (req, res) => {
  knex('dish_type')
    .where('id', req.params.id)
    .update({
      dish_id: req.body.dish_id,
      type_id: req.body.type_id,
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

const deleteDishType = async (req, res) => {
  knex('dish_type')
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
  getDishTypes,
  getDishType,
  createDishType,
  updateDishType,
  deleteDishType,
}
