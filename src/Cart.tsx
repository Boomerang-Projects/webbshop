import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Smartphone, Sparkles, Laptop, Sofa } from 'lucide-react'

interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  qty: number
}

interface CartProps {
  cart: CartItem[]
  incrementCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearFromCart: (id: number) => void
}

function Cart({ cart, incrementCart, removeFromCart, clearFromCart }: CartProps) {
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={48} strokeWidth={1.2} />
          </div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-sub">Looks like you haven't added anything yet. Browse our collection and find something you love.</p>
          <button className="cart-empty-cta" onClick={() => navigate('/')}>Start Shopping</button>
          <div className="cart-empty-categories">
            <p className="cart-empty-cat-label">Browse by category</p>
            <div className="cart-empty-cat-row">
              <button onClick={() => navigate('/')}><Smartphone size={16} />Tech</button>
              <button onClick={() => navigate('/')}><Sparkles size={16} />Beauty</button>
              <button onClick={() => navigate('/')}><Laptop size={16} />Laptops</button>
              <button onClick={() => navigate('/')}><Sofa size={16} />Home</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
              </div>
              <div className="cart-qty">
                <button onClick={() => removeFromCart(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => incrementCart(item.id)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => clearFromCart(item.id)}>✕</button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="detail-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
