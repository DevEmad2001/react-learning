import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import '../styles/products.css'

function ProductsPage() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    fetch('http://localhost:3000/api/products')
      .then((response) => {

        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })

  }, [])

  return (
    <div className="products-page">

      <Sidebar />

      <main className="products-content">

        <div className="products-header">

          <div>
            <h1>Products</h1>
            <p>Manage your store products</p>
          </div>

          <button className="add-product-button">
            + Add Product
          </button>

        </div>

        <div className="products-toolbar">

          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
          />

          <select className="category-select">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>

        </div>

        {loading && (
          <p className="loading-message">
            Loading products...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="products-grid">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
              />
            ))}

          </div>
        )}

      </main>

    </div>
  )
}

export default ProductsPage