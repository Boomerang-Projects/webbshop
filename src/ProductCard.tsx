import { useNavigate } from 'react-router-dom'

function ProductCard(props) {
  const navigate = useNavigate()
  
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.round(rating)
    for (let i = 0; i < fullStars; i++) {
      stars.push('★')
    }
    return stars.join('')
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${props.id}`)}>
      <img className="product-image" src={props.image} alt={props.title} />
      <div className="product-info">
        <h2 className="product-title">{props.title}</h2>
        <p className="product-rating">
          <span className="stars">{renderStars(props.rating)}</span>
          <span className="rating-number">({props.rating})</span>
        </p>
        <p className="product-price">${props.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard