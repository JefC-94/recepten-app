const knex = require('../../db')
const pool = require('../../db-pg')
const { getCartItemsByCartId } = require('../cart-item/cart-item-handlers')

const getCarts = async (req, res) => {
  knex('cart')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCart = async (req, res) => {
  knex('cart')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCartByUserId = async (req, res) => {
  try {
    const cart = await knex('cart').where('user_id', req.params.user_id).first()
    cart.cart_items = await getCartItemsByCartId(cart.id)
    res.status(200).send(cart)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }

  /* pool.query(
    `SELECT
    cart.user_id,
    cart.id,
    (
      select 
        json_agg(cart_item.*)
      from cart_item
      join cart ON cart_item.cart_id = cart.id
      where cart.user_id = $1
    ) as cart_items
    FROM cart
    WHERE cart.user_id = $1
    GROUP BY cart.user_id, cart.id
    `,
    [req.params.user_id],
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send(data.rows[0])
      }
    }
  ) */
}

const createCart = async (req, res) => {
  knex('cart')
    .insert({
      user_id: req.body.user_id,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateCart = async (req, res) => {
  knex('cart')
    .where('id', req.params.id)
    .update({
      user_id: req.body.user_id,
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

const deleteCart = async (req, res) => {
  knex('cart')
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
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports = {
  getCarts,
  getCart,
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
}
