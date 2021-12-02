const ingredientsRouter = require('./ingredients/routes')

const mainRouter = function (app) {
  app.use('/api/ingredients', ingredientsRouter)
}

module.exports = mainRouter
