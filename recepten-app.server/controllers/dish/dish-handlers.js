const knex = require('../../db')
const pool = require('../../db-pg')

const baseQuery = `select d.*, 
  (
      select json_agg(t.*) 
      from type t
      join dish_type dt on t.id = dt.type_id 
      where d.id=dt.dish_id
  ) as types, 
  (
      select json_agg(c.*) 
      from cuisine c 
      join dish_cuisine dc on c.id = dc.cuisine_id 
      where d.id = dc.dish_id
  ) as cuisines,
  (
      select json_agg(cat.*)
      from category cat
      join dish_cat on cat.id = dish_cat.cat_id
      where d.id = dish_cat.dish_id
  ) as categories,
  (
      select 
      json_agg(ing.*)
      from ingredient ing
      join dish_ingredient on ing.id = dish_ingredient.ingredient_id
      where d.id = dish_ingredient.dish_id
  ) as ingredients,
  row_to_json(users.*) as user
  from dish d
  left join users on d.user_id = users.id
`

const getDishes = async (req, res) => {
  pool.query(baseQuery, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message })
    } else {
      const sortedResults = data.rows.sort((a, b) => (a.id > b.id ? 1 : -1))
      res.status(200).send(sortedResults)
    }
  })
}

const getDish = async (req, res) => {
  pool.query(baseQuery + ` where d.id = $1`, [req.params.id], (err, data) => {
    if (err) {
      res.status(500).send({ message: err })
    } else {
      res.status(200).send(data.rows[0])
    }
  })
}

const getDishesByUserId = async (req, res) => {
  console.log(req.params.user_id)
  pool.query(baseQuery + ` where d.user_id = $1`, [req.params.user_id], (err, data) => {
    if (err) {
      res.status(500).send({ message: err })
    } else {
      res.status(200).send(data.rows)
    }
  })
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
  getDishesByUserId,
  getDish,
  createDish,
  updateDish,
  deleteDish,
}
