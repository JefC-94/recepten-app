const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const { getUnits, getUnit, createUnit, updateUnit, deleteUnit } = require('./unit-handlers')

router.get('/', getUnits)

router.get('/:id', getUnit)

router.post('/', jsonParser, createUnit)

router.put('/:id', jsonParser, updateUnit)

router.delete('/:id', deleteUnit)

module.exports = router
