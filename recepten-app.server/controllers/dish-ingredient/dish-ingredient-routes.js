const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getDishIngredients,
  getDishIngredient,
  createDishIngredient,
  updateDishIngredient,
  deleteDishIngredient,
} = require('./dish-ingredient-handlers')

router.get('/', getDishIngredients)

router.get('/:id', getDishIngredient)

router.post('/', jsonParser, createDishIngredient)

router.put('/:id', jsonParser, updateDishIngredient)

router.delete('/:id', deleteDishIngredient)

module.exports = router
