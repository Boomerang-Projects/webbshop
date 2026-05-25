import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ cart, setSelectedCategory }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <h2 className="logo">MyShop</h2>
      
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

     <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li onClick={() => setSelectedCategory('')}>All</li>
        <li onClick={() => setSelectedCategory('beauty')}>Beauty</li>
        <li onClick={() => setSelectedCategory('smartphones')}>Smartphones</li>
        <li onClick={() => setSelectedCategory('laptops')}>Laptops</li>
        <li onClick={() => setSelectedCategory('furniture')}>Furniture</li>
    </ul>   

      <button className="cart-btn" onClick={() => navigate('/cart')}>
        🛒 {cart.length > 0 ? cart.length : ''}
      </button>
    </nav>
  )
}

export default Navbar