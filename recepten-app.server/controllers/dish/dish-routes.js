const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const {
  getDishes,
  getDish,
  createDish,
  updateDish,
  deleteDish,
  getDishesByUserId,
} = require('./dish-handlers')

router.get('/', getDishes)

router.get('/user/:user_id', getDishesByUserId)

router.get('/:id', getDish)

router.post('/', jsonParser, createDish)

router.put('/:id', jsonParser, updateDish)

router.delete('/:id', deleteDish)

module.exports = router
