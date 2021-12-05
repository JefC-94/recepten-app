const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./cat-handlers')

router.get('/', getCategories)

router.get('/:id', getCategory)

router.post('/', jsonParser, createCategory)

router.put('/:id', jsonParser, updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router
