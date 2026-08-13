import { useEffect, useState } from 'react'
import {
  Bell,
  Search,
  Grid2X2,
  List,
} from 'lucide-react'

import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import AddProductModal from '../components/AddProductModal'

import '../styles/products.css'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState('All Categories')

  const [showAddModal, setShowAddModal] = useState(false)

  const [notifications] = useState([
    {
      id: 1,
      title: 'New order received',
      isRead: false,
    },
    {
      id: 2,
      title: 'Product stock is low',
      isRead: false,
    },
    {
      id: 3,
      title: 'New customer registered',
      isRead: false,
    },
  ])

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All Categories' ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  ).length

  return (
    <div className="products-page">
      <Sidebar />

      <main className="products-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="notification-button">
            <Bell size={24} />

            {unreadNotifications > 0 && (
              <span className="notification-badge">
                {unreadNotifications}
              </span>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="products-header">
          <div>
            <h1>Products</h1>
            <p>Manage your store products</p>
          </div>

          <button
            className="add-product-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add Product
          </button>
        </div>

        {/* Search + Filter + View */}
        <div className="products-toolbar">
          <div className="search-box">
            <Search
              size={20}
              className="search-icon"
            />

            <input
              className="search-input"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>

          <div className="view-switcher">
            <button
              type="button"
              className={`view-button ${
                viewMode === 'grid' ? 'active' : ''
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 size={20} />
            </button>

            <button
              type="button"
              className={`view-button ${
                viewMode === 'list' ? 'active' : ''
              }`}
              onClick={() => setViewMode('list')}
            >
              <List size={21} />
            </button>
          </div>
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
          <div
            className={`products-grid ${
              viewMode === 'list' ? 'list-view' : ''
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>
        )}
      </main>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={(newProduct) => {
            setProducts((currentProducts) => [
              ...currentProducts,
              newProduct,
            ])
          }}
        />
      )}
    </div>
  )
}

export default ProductsPage