const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getDishCuisines,
  getDishCuisine,
  createDishCuisine,
  updateDishCuisine,
  deleteDishCuisine,
} = require('./dish-cuisine-handlers')

router.get('/', getDishCuisines)

router.get('/:id', getDishCuisine)

router.post('/', jsonParser, createDishCuisine)

router.put('/:id', jsonParser, updateDishCuisine)

router.delete('/:id', deleteDishCuisine)

module.exports = router
