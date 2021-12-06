const knex = require('../../db')

const getDishIngredients = async (req, res) => {
  knex('dish_ingredient')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getDishIngredient = async (req, res) => {
  knex('dish_ingredient')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createDishIngredient = async (req, res) => {
  knex('dish_ingredient')
    .insert({
      dish_id: req.body.dish_id,
      ingredient_id: req.body.ingredient_id,
      quantity: req.body.quantity,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateDishIngredient = async (req, res) => {
  knex('dish_ingredient')
    .where('id', req.params.id)
    .update({
      dish_id: req.body.dish_id,
      ingredient_id: req.body.ingredient_id,
      quantity: req.body.quantity,
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

const deleteDishIngredient = async (req, res) => {
  knex('dish_ingredient')
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
  getDishIngredients,
  getDishIngredient,
  createDishIngredient,
  updateDishIngredient,
  deleteDishIngredient,
}
