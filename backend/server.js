const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


// =============================
// DATA
// =============================

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

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin'
  }
]


// =============================
// AUTH MIDDLEWARE
// =============================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization token is required'
    })
  }

  const token = authHeader.split(' ')[1]

  if (token !== 'test-admin-token-123') {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }

  next()
}


// =============================
// LOGIN
// Public API
// =============================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  )

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password'
    })
  }

  const token = 'test-admin-token-123'

  res.status(200).json({
    message: 'Login successful',

    token,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
})


// =============================
// GET PRODUCTS
// Protected
// =============================

app.get(
  '/api/products',
  authenticateToken,
  (req, res) => {
    res.status(200).json(products)
  }
)


// =============================
// POST PRODUCT
// Protected
// =============================

app.post(
  '/api/products',
  authenticateToken,
  (req, res) => {
    const { name, price, category } = req.body

    if (!name || !price || !category) {
      return res.status(400).json({
        message: 'name, price and category are required'
      })
    }

    const newId =
      products.length > 0
        ? Math.max(
            ...products.map((product) => product.id)
          ) + 1
        : 1

    const newProduct = {
      id: newId,
      name,
      price: Number(price),
      category
    }

    products.push(newProduct)

    res.status(201).json(newProduct)
  }
)


// =============================
// DELETE PRODUCT
// Protected
// =============================

app.delete(
  '/api/products/:id',
  authenticateToken,
  (req, res) => {
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
  }
)


// =============================
// START SERVER
// =============================

app.listen(PORT, () => {
  console.log(
    `API running on http://localhost:${PORT}`
  )
})