const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const { getTypes, getType, createType, updateType, deleteType } = require('./type-handlers')

router.get('/', getTypes)

router.get('/:id', getType)

router.post('/', jsonParser, createType)

router.put('/:id', jsonParser, updateType)

router.delete('/:id', deleteType)

module.exports = router
