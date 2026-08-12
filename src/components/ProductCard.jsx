function ProductCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>Price: {props.price} JOD</p>
      <button>View Product</button>
    </div>
  )
}

export default ProductCard