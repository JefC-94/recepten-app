const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
  getCartByUserId,
} = require('./cart-handlers')

router.get('/', getCarts)

router.get('/:id', getCart)

router.get('/user/:user_id', getCartByUserId)

router.post('/', jsonParser, createCart)

router.put('/:id', jsonParser, updateCart)

router.delete('/:id', deleteCart)

module.exports = router
