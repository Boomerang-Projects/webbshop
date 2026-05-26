import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  title: string
  price: number
  image: string
  id: number
  rating: number
  addToCart: () => void
}

function ProductCard({ title, price, image, id, rating, addToCart }: ProductCardProps) {
  const navigate = useNavigate()

  const renderStars = (r: number) => '★'.repeat(Math.round(r))

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <img className="product-image" src={image} alt={title} />
      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-rating">
          <span className="stars">{renderStars(rating)}</span>
          <span className="rating-number">({rating})</span>
        </p>
        <p className="product-price">${price}</p>
        <button className="add-to-cart" onClick={e => { e.stopPropagation(); addToCart() }}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard
