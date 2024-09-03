const productsRoutes = require('express').Router()
const { insertProducto, getAllProducts } = require('../controllers/controllers')

productsRoutes.post('/insert_product', insertProducto)
productsRoutes.get('/', getAllProducts)

module.exports = productsRoutes
