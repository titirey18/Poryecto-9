require('dotenv').config()
const express = require('express')
const productsRoutes = require('./src/api/routes/productsRoutes')
const { connectDB } = require('./src/config/db')
const cors = require('cors')
const { scrapper } = require('./src/scraper')

const app = express()
app.use(express.json())
connectDB()

app.use(cors())

app.use('/api/v1/products', productsRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000')
})

/* scrapper('https://www.instant-gaming.com/es/pc/steam/tendencias/') */
