const knex = require('../../db')

const getDishCuisines = async (req, res) => {
  knex('dish_cuisine')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getDishCuisine = async (req, res) => {
  knex('dish_cuisine')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createDishCuisine = async (req, res) => {
  knex('dish_cuisine')
    .insert({
      dish_id: req.body.dish_id,
      cuisine_id: req.body.cuisine_id,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateDishCuisine = async (req, res) => {
  knex('dish_cuisine')
    .where('id', req.params.id)
    .update({
      dish_id: req.body.dish_id,
      cuisine_id: req.body.cuisine_id,
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

const deleteDishCuisine = async (req, res) => {
  knex('dish_cuisine')
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
  getDishCuisines,
  getDishCuisine,
  createDishCuisine,
  updateDishCuisine,
  deleteDishCuisine,
}
