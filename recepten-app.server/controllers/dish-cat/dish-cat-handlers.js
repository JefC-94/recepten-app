const knex = require('../../db')

const getDishCats = async (req, res) => {
  knex('dish_cat')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getDishCat = async (req, res) => {
  knex('dish_cat')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createDishCat = async (req, res) => {
  knex('dish_cat')
    .insert({
      dish_id: req.body.dish_id,
      cat_id: req.body.cat_id,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateDishCat = async (req, res) => {
  knex('dish_cat')
    .where('id', req.params.id)
    .update({
      dish_id: req.body.dish_id,
      cat_id: req.body.cat_id,
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

const deleteDishCat = async (req, res) => {
  knex('dish_cat')
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
  getDishCats,
  getDishCat,
  createDishCat,
  updateDishCat,
  deleteDishCat,
}
