import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <h2 className="logo">MyShop</h2>
      
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li>Beauty</li>
        <li>Smartphones</li>
        <li>Laptops</li>
        <li>Furniture</li>
      </ul>

      <button className="cart-btn" onClick={() => navigate('/cart')}>
        🛒 {cart.length > 0 ? cart.length : ''}
      </button>
    </nav>
  )
}

export default Navbar