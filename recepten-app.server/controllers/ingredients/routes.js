const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const { getIngredients, getIngredient, createIngredient, updateIngredient } = require('./handlers')

router.get('/', getIngredients)

router.get('/:id', getIngredient)

router.post('/', jsonParser, createIngredient)

router.put('/:id', jsonParser, updateIngredient)

module.exports = router
