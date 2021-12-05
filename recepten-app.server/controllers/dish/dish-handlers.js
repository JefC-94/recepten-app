const knex = require('../../db')
const pool = require('../../db-pg')

const getDishes = async (req, res) => {
  const query = `
  SELECT
  dish.*,
  jsonb_agg(type) as types,
  jsonb_agg(cuisine) as cuisines
  FROM dish
  LEFT JOIN dish_type ON dish.id = dish_type.dish_id
  LEFT JOIN type ON dish_type.type_id = type.id
  LEFT JOIN dish_cuisine ON dish.id = dish_cuisine.dish_id
  LEFT JOIN cuisine ON dish_cuisine.cuisine_id = cuisine.id
  GROUP BY dish.id
`

  pool.query(
    `
    SELECT
  dish.*,
  jsonb_agg(type) as types,
  jsonb_agg(cuisine) as cuisines
  FROM dish
  LEFT JOIN dish_type ON dish.id = dish_type.dish_id
  LEFT JOIN type ON dish_type.type_id = type.id
  LEFT JOIN dish_cuisine ON dish.id = dish_cuisine.dish_id
  LEFT JOIN cuisine ON dish_cuisine.cuisine_id = cuisine.id
  GROUP BY dish.id
  `,
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err.message })
      } else {
        const sortedResults = data.rows.sort((a, b) => (a.id > b.id ? 1 : -1))
        res.status(200).send(sortedResults)
      }
    }
  )
}

const getDish = async (req, res) => {
  pool.query(
    `SELECT 
    dish.*,
    row_to_json(users.*) as user_id  
    FROM dish
    LEFT JOIN users ON dish.user_id = users.id
    WHERE dish.id = $1
  `,
    [req.params.id],
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send(data.rows[0])
      }
    }
  )
}

const createDish = async (req, res) => {
  const { name, description, cooking_time, recipe, image_url, favorite, user_id, created_at } =
    req.body

  knex('dish')
    .insert({
      name,
      description,
      cooking_time,
      recipe,
      image_url,
      favorite,
      user_id,
      created_at,
      updated_at: null,
    })
    .returning('id')
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

const updateDish = async (req, res) => {
  const { name, description, cooking_time, recipe, image_url, favorite, user_id, updated_at } =
    req.body

  knex('dish')
    .where('id', req.params.id)
    .update({
      name,
      description,
      cooking_time,
      recipe,
      image_url,
      favorite,
      user_id,
      updated_at,
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
      res.status(500).send({ message: err.message })
    })
}

const deleteDish = async (req, res) => {
  knex('dish')
    .where('id', req.params.id)
    .del()
    .returning('id')
    .then(data => {
      if (data.length) {
        res.status(200).send(JSON.stringify(data))
      } else {
        res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

module.exports = {
  getDishes,
  getDish,
  createDish,
  updateDish,
  deleteDish,
}
