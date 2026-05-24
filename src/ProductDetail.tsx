import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(data => setProduct(data))
    .catch(error => {
      console.error('Failed to fetch product:', error)
    })
}, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className="detail-container">
      <img className="detail-image" src={product.thumbnail} alt={product.title} />
      <div className="detail-info">
        <h1 className="detail-title">{product.title}</h1>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">${product.price}</p>
        <button className="detail-btn" onClick={() => addToCart(product)}>
            Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetail