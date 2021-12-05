const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deteleIngredient,
} = require('./ing-handlers')

router.get('/', getIngredients)

router.get('/:id', getIngredient)

router.post('/', jsonParser, createIngredient)

router.put('/:id', jsonParser, updateIngredient)

router.delete('/:id', deteleIngredient)

module.exports = router
