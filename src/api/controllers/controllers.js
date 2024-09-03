const Product = require('../model/model')
const producto = require('../../../productos.json')

const insertProducto = async (req, res, next) => {
  try {
    await Product.insertMany(producto.result)
    return res.status(201).json('Todo subido')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const allproducto = await Product.find()
    return res.status(200).json(allproducto)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  insertProducto,
  getAllProducts
}
