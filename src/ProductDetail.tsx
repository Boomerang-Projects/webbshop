import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react'
import { useShop } from './ShopContext'

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
}

function ProductDetail() {
  const { addToCart } = useShop()
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  // Hämtar produktdata baserat på id från URL:en; try/catch fångar nätverksfel
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
        setSelectedImage(0)
      } catch (err) {
        console.error('Failed to fetch product:', err)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) return (
    <div className="detail-loading">
      <div className="detail-skeleton-img" />
      <div className="detail-skeleton-info">
        <div className="detail-skeleton-line wide" />
        <div className="detail-skeleton-line" />
        <div className="detail-skeleton-line short" />
      </div>
    </div>
  )

  const images = product.images?.length ? product.images : [product.thumbnail]
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
  const fullStars = Math.round(product.rating)
  const inStock = product.stock > 0

  // Lägger till produkten i kundvagnen det antal gånger som användaren valt
  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="detail-container">
        <div className="detail-left">
          <div className="detail-main-image">
            <img src={images[selectedImage]} alt={product.title} />
          </div>
          {images.length > 1 && (
            <div className="detail-thumbnails">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`detail-thumb ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-category">{product.brand ? `${product.brand} · ` : ''}{product.category}</p>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <span className="detail-stars">{'★'.repeat(fullStars)}{'☆'.repeat(5 - fullStars)}</span>
            <span className="detail-rating-num">{product.rating}</span>
            <span className="detail-rating-count">({product.stock} in stock)</span>
          </div>

          <div className="detail-pricing">
            <span className="detail-price">${product.price}</span>
            {product.discountPercentage > 1 && (
              <>
                <span className="detail-original">${originalPrice}</span>
                <span className="detail-discount-badge">-{Math.round(product.discountPercentage)}%</span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className={`detail-stock-badge ${inStock ? 'in-stock' : 'out-stock'}`}>
            {inStock ? `✓ In Stock (${product.stock} left)` : '✕ Out of Stock'}
          </div>

          <div className="detail-qty-row">
            <div className="detail-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button
              className={`detail-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart size={18} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          <div className="detail-perks">
            <div className="detail-perk"><Truck size={16} />Free shipping on orders over $50</div>
            <div className="detail-perk"><RotateCcw size={16} />Free 30-day returns</div>
            <div className="detail-perk"><Shield size={16} />2-year warranty included</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
