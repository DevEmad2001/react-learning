function ProductCard({ name, price, category }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <span>{name.charAt(0)}</span>
      </div>

      <div className="product-info">
        <h3>{name}</h3>

        <p className="product-category">
          {category}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ${price}
          </span>

          <button className="product-menu">
            ...
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard