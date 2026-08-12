import { useState } from 'react'

function AddProductModal({ onClose, onProductAdded }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Electronics')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)
    setError('')

    const newProduct = {
      name: name,
      price: Number(price),
      category: category
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/products',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(newProduct)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product')
      }

      onProductAdded(data)

      setName('')
      setPrice('')
      setCategory('Electronics')

      onClose()

    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay">

      <div className="product-modal">

        <div className="modal-header">
          <h2>Add Product</h2>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option>Electronics</option>
              <option>Accessories</option>
            </select>
          </div>

          {error && (
            <p className="modal-error">
              {error}
            </p>
          )}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default AddProductModal