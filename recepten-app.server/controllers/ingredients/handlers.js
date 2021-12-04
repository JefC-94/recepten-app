const knex = require('../../db')
const pool = require('../../db-pg')

const getIngredients = async (req, res) => {
  pool.query(
    `SELECT 
    ingredient.*,
    row_to_json(unit.*) as unit_id  
    FROM ingredient
    INNER JOIN unit ON ingredient.unit_id = unit.id
  `,
    (err, data) => {
      res.status(200).send(data.rows)
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
  pool.query(
    `INSERT INTO ingredient(name, name_plural, unit_id) VALUES($1, $2, $3) RETURNING *`,
    [req.body.name, req.body.name_plural, req.body.unit_id],
    (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data.rows[0])
      }
    }
  )
}

const updateIngredient = async (req, res) => {
  // not working yet!
  pool.query(
    `UPDATE ingredient
    SET 
      name = $2
      name_plural = $3
      unit_id = $4
    WHERE id = $1
    `,
    [req.params.id, req.body.name, req.body.name_plural, req.body.unit_id],
    (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.sendStatus(200)
      }
    }
  )

  /* const queryIngredient = knex('ingredient').where('id', req.params.id)

  knex('ingredient')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
      name_plural: req.body.name_plural,
      unit_id: req.body.unit_id,
    })
    .then(rows => {
      return res.sendStatus(200)
    })
    .catch(err => {
      return res.status(500).send({ message: err })
    }) */
}

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
}
