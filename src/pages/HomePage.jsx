import { useState } from 'react'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [count, setCount] = useState(0)

  function increaseCount() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Home Page</h1>

      <p>Count: {count}</p>

      <button onClick={increaseCount}>
        Increase
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>

      
      <ProductCard name="Laptop" price="650" />
      <ProductCard name="Phone" price="400" />
    </div>
  )
}

export default HomePage