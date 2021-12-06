const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getDishCats,
  getDishCat,
  createDishCat,
  updateDishCat,
  deleteDishCat,
} = require('./dish-cat-handlers')

router.get('/', getDishCats)

router.get('/:id', getDishCat)

router.post('/', jsonParser, createDishCat)

router.put('/:id', jsonParser, updateDishCat)

router.delete('/:id', deleteDishCat)

module.exports = router
