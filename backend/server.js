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


// GET Products
app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})


// POST Product
app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body

  if (!name || !price || !category) {
    return res.status(400).json({
      message: 'name, price and category are required'
    })
  }

  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1

  const newProduct = {
    id: newId,
    name: name,
    price: Number(price),
    category: category
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
})


// DELETE Product
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id)

  const productIndex = products.findIndex(
    (product) => product.id === id
  )

  if (productIndex === -1) {
    return res.status(404).json({
      message: 'Product not found'
    })
  }

  const deletedProduct = products[productIndex]

  products.splice(productIndex, 1)

  res.status(200).json({
    message: 'Product deleted successfully',
    product: deletedProduct
  })
})


app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})