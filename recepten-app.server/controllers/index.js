const ingredientsRouter = require('./ingredient/ing-routes')
const dishesRouter = require('./dish/dish-routes')
const catRouter = require('./category/cat-routes')
const typesRoutes = require('./type/type-routes')
const unitsRouter = require('./unit/unit-routes')
const cartRouter = require('./cart/cart-routes')
const cartItemRouter = require('./cart-item/cart-item-routes')
const cuisineRouter = require('./cuisine/cuisine-routes')
const dishCatRouter = require('./dish-cat/dish-cat-routes')
const dishCuisineRouter = require('./dish-cuisine/dish-cuisine-routes')
const dishTypeRouter = require('./dish-type/dish-type-routes')
const dishIngredientRouter = require('./dish-ingredient/dish-ingredient-routes')

const mainRouter = function (app) {
  app.use('/api/ingredients', ingredientsRouter)
  app.use('/api/dishes', dishesRouter)
  app.use('/api/categories', catRouter)
  app.use('/api/types', typesRoutes)
  app.use('/api/units', unitsRouter)
  app.use('/api/carts', cartRouter)
  app.use('/api/cart-items', cartItemRouter)
  app.use('/api/cuisines', cuisineRouter)
  app.use('/api/dish-cats', dishCatRouter)
  app.use('/api/dish-cuisines', dishCuisineRouter)
  app.use('/api/dish-types', dishTypeRouter)
  app.use('/api/dish-ingredients', dishIngredientRouter)
}

module.exports = mainRouter
