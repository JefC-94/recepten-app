const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getDishTypes,
  getDishType,
  createDishType,
  updateDishType,
  deleteDishType,
} = require('./dish-type-handlers')

router.get('/', getDishTypes)

router.get('/:id', getDishType)

router.post('/', jsonParser, createDishType)

router.put('/:id', jsonParser, updateDishType)

router.delete('/:id', deleteDishType)

module.exports = router
