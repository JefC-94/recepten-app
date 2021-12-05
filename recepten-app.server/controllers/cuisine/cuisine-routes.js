const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getCuisines,
  getCuisine,
  createCuisine,
  updateCuisine,
  deleteCuisine,
} = require('./cuisine-handlers')

router.get('/', getCuisines)

router.get('/:id', getCuisine)

router.post('/', jsonParser, createCuisine)

router.put('/:id', jsonParser, updateCuisine)

router.delete('/:id', deleteCuisine)

module.exports = router
