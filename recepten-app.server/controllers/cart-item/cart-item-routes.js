const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getCartItems,
  getCartItem,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require('./cart-item-handlers')

router.get('/', getCartItems)

router.get('/:id', getCartItem)

router.post('/', jsonParser, createCartItem)

router.put('/:id', jsonParser, updateCartItem)

router.delete('/:id', deleteCartItem)

module.exports = router
