const knex = require('../../db')
const pool = require('../../db-pg')

const getCartItems = async (req, res) => {
  await knex('cart_item')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCartItem = async (req, res) => {
  await knex('cart_item')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCartItemsByCartId = async cart_id => {
  try {
    const data = await pool.query(
      `SELECT
      cart_item.id,
      cart_item.quantity,
      json_build_object(
        'id', ingredient.id,
        'name', ingredient.name,
        'name_plural', ingredient.name_plural,
        'unit', json_build_object(
          'id', unit.id,
          'name', unit.name,
          'name_plural', unit.name_plural
        )
      ) as ingredient
      FROM cart_item
      INNER JOIN ingredient ON cart_item.ingredient_id = ingredient.id
      LEFT OUTER JOIN unit ON ingredient.unit_id = unit.id
      WHERE cart_id = $1
      `,
      [cart_id]
    )
    return data.rows
  } catch (err) {
    console.log(err)
    return err
  }
}

const createCartItem = async (req, res) => {
  knex('cart_item')
    .insert({
      cart_id: req.body.cart_id,
      ingredient_id: req.body.ingredient_id,
      quantity: req.body.quantity,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateCartItem = async (req, res) => {
  knex('cart_item')
    .where('id', req.params.id)
    .update({
      cart_id: req.body.cart_id,
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

const deleteCartItem = async (req, res) => {
  knex('cart_item')
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
  getCartItems,
  getCartItem,
  getCartItemsByCartId,
  createCartItem,
  updateCartItem,
  deleteCartItem,
}
