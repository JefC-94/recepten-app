const knex = require('../../db')

const getCategories = async (req, res) => {
  knex('category')
    .then(rows => res.status(200).send(rows))
    .catch(err => res.status(500).send({ message: err.message }))
}

const getCategory = async (req, res) => {
  knex('category')
    .where('id', req.params.id)
    .then(rows => res.status(200).send(rows[0]))
    .catch(err => res.status(500).send({ message: err.message }))
}

const createCategory = async (req, res) => {
  knex('category')
    .insert({
      name: req.body.name,
    })
    .returning('id')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }))
}

const updateCategory = async (req, res) => {
  knex('category')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
    })
    .returning('id')
    .then(data => {
      if (data.length) {
        return res.status(200).send(JSON.stringify(data))
      } else {
        return res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
}

const deleteCategory = async (req, res) => {
  knex('category')
    .where('id', req.params.id)
    .del()
    .returning('id')
    .then(data => {
      if (data.length) {
        return res.status(200).send(JSON.stringify(data))
      } else {
        return res.status(500).send({ message: 'no item with this id' })
      }
    })
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
