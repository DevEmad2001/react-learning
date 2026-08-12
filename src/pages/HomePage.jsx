import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const newProduct = {
      name: name,
      price: Number(price),
      category: category
    }

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(newProduct)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Error:', data.message)
        return
      }

      setProducts((currentProducts) => [
        ...currentProducts,
        data
      ])

      setName('')
      setPrice('')
      setCategory('')

    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>Home Page</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>

      <hr />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="number"
          placeholder="Product price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <input
          type="text"
          placeholder="Product category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">
          Add Product
        </button>
      </form>

      <hr />

      <h2>Products</h2>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  )
}

export default HomePage