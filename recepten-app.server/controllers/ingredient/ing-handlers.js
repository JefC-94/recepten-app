const knex = require('../../db')
const pool = require('../../db-pg')

const getIngredients = async (req, res) => {
  pool.query(
    `SELECT 
    ingredient.*,
    row_to_json(unit.*) as unit_id  
    FROM ingredient
    LEFT JOIN unit ON ingredient.unit_id = unit.id
  `,
    (err, data) => {
      const sortedResults = data.rows.sort((a, b) => (a.id > b.id ? 1 : -1))
      res.status(200).send(sortedResults)
    }
  )
}

const getIngredient = async (req, res) => {
  pool.query(
    `SELECT 
    ingredient.*,
    row_to_json(unit.*) as unit_id  
    FROM ingredient
    LEFT JOIN unit ON ingredient.unit_id = unit.id
    WHERE ingredient.id = $1
  `,
    [req.params.id],
    (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data.rows[0])
      }
    }
  )
}

const createIngredient = async (req, res) => {
  const { name, name_plural, unit_id } = req.body

  knex('ingredient')
    .insert({
      name,
      name_plural,
      unit_id,
    })
    .returning('id')
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

const updateIngredient = async (req, res) => {
  knex('ingredient')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
      name_plural: req.body.name_plural,
      unit_id: req.body.unit_id,
    })
    .returning('id')
    .then(data => {
      if (data.length) {
        return res.status(200).send(JSON.stringify(data))
      } else {
        return res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err })
    })
}

const deteleIngredient = async (req, res) => {
  knex('ingredient')
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
    .catch(err => {
      return res.status(500).send({ message: err.message })
    })
}

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deteleIngredient,
}
