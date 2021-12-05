const ingredientsRouter = require('./ingredient/ing-routes')
const dishesRouter = require('./dish/dish-routes')
const catRouter = require('./category/cat-routes')
const typesRoutes = require('./type/type-routes')
const unitsRouter = require('./unit/unit-routes')
const cartRouter = require('./cart/cart-routes')
const cartItemRouter = require('./cart-item/cart-item-routes')
const cuisineRouter = require('./cuisine/cuisine-routes')

const mainRouter = function (app) {
  app.use('/api/ingredients', ingredientsRouter)
  app.use('/api/dishes', dishesRouter)
  app.use('/api/categories', catRouter)
  app.use('/api/types', typesRoutes)
  app.use('/api/units', unitsRouter)
  app.use('/api/carts', cartRouter)
  app.use('/api/cart-items/', cartItemRouter)
  app.use('/api/cuisines', cuisineRouter)
}

module.exports = mainRouter
