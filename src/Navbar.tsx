import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { useShop } from './ShopContext'

const CATEGORY_GROUPS = [
  { label: 'Tech',           subs: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'] },
  { label: 'Fashion',        subs: ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-bags', 'womens-shoes', 'sunglasses', 'tops'] },
  { label: 'Beauty & Health',subs: ['beauty', 'skin-care', 'fragrances'] },
  { label: 'Home',           subs: ['furniture', 'home-decoration', 'kitchen-accessories'] },
  { label: 'Sports',         subs: ['sports-accessories', 'motorcycle', 'vehicle'] },
  { label: 'Groceries',      subs: ['groceries'] },
]

const prettify = (slug: string) =>
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

function Navbar() {
  const { cartCount, search, setSearch, selectCategory, selectedCategory } = useShop()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light'
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false)
        setOpenGroup(null)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning')
    setTheme(t => t === 'dark' ? 'light' : 'dark')
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400)
  }

  const handleSub = (sub: string) => {
    navigate('/')
    selectCategory(sub)
    setOpenGroup(null)
    setMenuOpen(false)
  }

  const handleAll = () => {
    navigate('/')
    selectCategory('')
    setOpenGroup(null)
    setMenuOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSearch('')
  }

  return (
    <div className="navbar-wrapper">
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
        <h2 className="logo" onClick={() => location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}>MyShop</h2>

        <div className="hamburger" onClick={() => { setMenuOpen(!menuOpen); setOpenGroup(null) }}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <li
            className={selectedCategory === '' ? 'active' : ''}
            onClick={handleAll}
          >
            All
          </li>

          {CATEGORY_GROUPS.map(group => {
            const isGroupActive = group.subs.includes(selectedCategory)
            const isOpen = openGroup === group.label
            return (
              <li
                key={group.label}
                className={`nav-group${isGroupActive ? ' active' : ''}${isOpen ? ' open' : ''}`}
                onMouseEnter={() => { if (!menuOpen) setOpenGroup(group.label) }}
                onMouseLeave={() => { if (!menuOpen) setOpenGroup(null) }}
              >
                <span
                  className="nav-group-label"
                  onClick={() => { if (menuOpen) setOpenGroup(isOpen ? null : group.label) }}
                >
                  {group.label}
                  <ChevronDown size={12} className={`nav-chevron${isOpen ? ' rotated' : ''}`} />
                </span>

                <ul
                  className={`nav-dropdown${isOpen ? ' nav-dropdown--open' : ''}`}
                  onMouseEnter={() => { if (!menuOpen) setOpenGroup(group.label) }}
                  onMouseLeave={() => { if (!menuOpen) setOpenGroup(null) }}
                >
                  {group.subs.map(sub => (
                    <li
                      key={sub}
                      className={selectedCategory === sub ? 'active' : ''}
                      onClick={() => handleSub(sub)}
                    >
                      {prettify(sub)}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}

          {menuOpen && (
            <li className="nav-menu-footer">
              <span className="nav-menu-footer-logo">MyShop</span>
              <span className="nav-menu-footer-copy">© {new Date().getFullYear()} · Free shipping · Free returns</span>
            </li>
          )}
        </ul>

        <div className={`nav-icons${menuOpen ? ' menu-open' : ''}`}>
<span className="nav-icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          <span className="nav-icon" onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </span>
          <span className="nav-icon" onClick={() => navigate('/cart')}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </span>
        </div>
      </nav>

      {searchOpen && (
        <div className="search-dropdown">
          <Search size={22} opacity={0.4} />
          <input
            className="search-dropdown-input"
            autoFocus
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <X size={18} style={{ cursor: 'pointer', opacity: 0.5 }} onClick={closeSearch} />}
        </div>
      )}
    </div>
  )
}

export default Navbar
