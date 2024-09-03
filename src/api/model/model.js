const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: false },
    img: { type: String, required: true },
    stock: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
    collection: 'products'
  }
)

const Product = mongoose.model('products', productSchema)

module.exports = Product
