import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const products = [
    {
      id: 1,
      name: 'Laptop',
      price: 650
    },
    {
      id: 2,
      name: 'Phone',
      price: 400
    },
    {
      id: 3,
      name: 'Headphones',
      price: 80
    }
  ]

  // ✅ التعديل الجديد
  useEffect(() => {
    console.log('Home Page loaded')
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    console.log('Name:', name)
    console.log('Price:', price)
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