import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ShoppingBag } from 'lucide-react'

function Navbar({ cart, setSelectedCategory }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <div className="announcement-bar">
                <div className="announcement-text">
                    {Array(6).fill(null).map((_, i) => (
                        <span key={i}>
                            Free Worldwide Shipping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            New Arrivals Every Week &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Free Returns on All Orders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    ))}
                </div>
            </div>

            <nav className="navbar">
                <h2 className="logo" onClick={() => navigate('/')}>MyShop</h2>

                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>

                <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
                    <li onClick={() => { setSelectedCategory(''); navigate('/') }}>All</li>
                    <li onClick={() => { setSelectedCategory('beauty'); navigate('/') }}>Beauty</li>
                    <li onClick={() => { setSelectedCategory('smartphones'); navigate('/') }}>Smartphones</li>
                    <li onClick={() => { setSelectedCategory('laptops'); navigate('/') }}>Laptops</li>
                    <li onClick={() => { setSelectedCategory('furniture'); navigate('/') }}>Furniture</li>
                </ul>

                <div className="nav-icons">
                    <span className="nav-icon">
                        <Search size={20} />
                    </span>
                    <span className="nav-icon" onClick={() => navigate('/cart')}>
                        <ShoppingBag size={20} />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar