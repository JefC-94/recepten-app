const knex = require('../../db')

const getIngredients = async (req, res) => {
  const queryIngredients = await knex('ingredient')
  res.status(200).send(queryIngredients)
}

const getIngredient = async (req, res) => {
  const queryIngredient = await knex('ingredient')
    .where('ingredient.id', req.params.id)
    .join('unit', 'ingredient.unit_id', '=', 'unit.id')
    .options({ nestTables: true })
    .first()
  res.status(200).send(queryIngredient)
}

const createIngredient = async (req, res) => {
  knex('ingredient')
    .insert({
      name: req.body.name,
      name_plural: req.body.name_plural,
      unit_id: req.body.unit_id,
    })
    .then(rows => {
      return res.status(201).send({ message: rows[0] })
    })
    .catch(err => {
      return res.status(500).send({ message: err })
    })
}

const updateIngredient = async (req, res) => {
  const queryIngredient = knex('ingredient').where('id', req.params.id)

  knex('ingredient')
    .where('id', req.params.id)
    .update({
      name: req.body.name /* || queryIngredient.name */,
      name_plural: req.body.name_plural /* || queryIngredient.name_plural */,
      unit_id: req.body.unit_id /* || queryIngredient.unit_id */,
    })
    .then(rows => {
      return res.sendStatus(200)
    })
    .catch(err => {
      return res.status(500).send({ message: err })
    })
}

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
}
