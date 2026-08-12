const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 650,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Phone',
    price: 400,
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Headphones',
    price: 80,
    category: 'Accessories'
  }
]

app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})

app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body

  if (!name || !price || !category) {
    return res.status(400).json({
      message: 'name, price and category are required'
    })
  }

  const newProduct = {
    id: products.length + 1,
    name: name,
    price: Number(price),
    category: category
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})