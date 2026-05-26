import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Confirmation from './Confirmation'
import Checkout from './Checkout'
import { useState, useEffect, useRef } from 'react'
import { Sparkles, Smartphone, Laptop, Sofa, Tag } from 'lucide-react'
import CookieBanner from './CookieBanner'
import Footer from './Footer'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [cartToast, setCartToast] = useState(false)
  const navigate = useNavigate()
  const featuredScrollRef = useRef(null)

  const scrollToProducts = () => {
    const el = document.getElementById('products')
    const navbar = document.querySelector('.navbar-wrapper')
    if (!el) return
    const offset = (navbar?.offsetHeight ?? 0) + 12
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
  }

  const featuredItems = products
    .filter(p => p.discountPercentage > 5)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 10)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const el = featuredScrollRef.current
    if (!el || featuredItems.length === 0) return
    el.scrollLeft = el.scrollWidth / 2
  }, [featuredItems.length])

  useEffect(() => {
    const el = featuredScrollRef.current
    if (!el) return
    const onScroll = () => {
      const half = el.scrollWidth / 2
      if (el.scrollLeft >= half * 1.5) el.scrollLeft -= half
      else if (el.scrollLeft <= half * 0.5) el.scrollLeft += half
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!search) return
    scrollToProducts()
  }, [search])

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=200')
      .then(res => res.json())
      .then(data => { setProducts(data.products); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const scrollFeatured = (dir) => {
    featuredScrollRef.current?.scrollBy({ left: dir * 212, behavior: 'smooth' })
  }

  const selectCategory = (cat) => {
    setSelectedCategory(cat)
    setTimeout(scrollToProducts, 50)
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartToast(true)
    setTimeout(() => setCartToast(false), 2000)
  }

  const incrementCart = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))
  }

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id)
      if (existing?.qty > 1) return prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
      return prev.filter(item => item.id !== id)
    })
  }

  const clearFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const [sortBy, setSortBy] = useState('default')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating')     return b.rating - a.rating
    return 0
  })

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div>
      <CookieBanner />
      {cartToast && <div className="cart-toast">Added to cart!</div>}
      <Navbar
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
        selectCategory={selectCategory}
        selectedCategory={selectedCategory}
      />
      <Routes>
        <Route path="/" element={
          <div>
            <div className="hero">
              <p className="hero-tag">New Collection 2026</p>
              <h1 className="hero-title">Discover Something New</h1>
              <p className="hero-subtitle">Shop the latest products across all categories</p>
              <button className="hero-btn" onClick={() => { setSelectedCategory(''); scrollToProducts() }}>
                Shop Now
              </button>
            </div>
            <div className="categories-section">
              <h2 className="section-title">Shop by Category</h2>
              <div className="categories-grid">
                <div className={`category-card${selectedCategory === 'beauty' ? ' active' : ''}`} onClick={() => selectCategory('beauty')}>
                  <Sparkles size={32} />
                  <p>Beauty</p>
                </div>
                <div className={`category-card${selectedCategory === 'smartphones' ? ' active' : ''}`} onClick={() => selectCategory('smartphones')}>
                  <Smartphone size={32} />
                  <p>Smartphones</p>
                </div>
                <div className={`category-card${selectedCategory === 'laptops' ? ' active' : ''}`} onClick={() => selectCategory('laptops')}>
                  <Laptop size={32} />
                  <p>Laptops</p>
                </div>
                <div className={`category-card${selectedCategory === 'furniture' ? ' active' : ''}`} onClick={() => selectCategory('furniture')}>
                  <Sofa size={32} />
                  <p>Furniture</p>
                </div>
              </div>
            </div>
            <div className="featured-section">
              <h2 className="section-title"><Tag size={24} style={{verticalAlign: 'middle', marginRight: 8}} />Hot Deals</h2>
              <div className="featured-carousel">
                <button className="carousel-arrow carousel-arrow-left" onClick={() => scrollFeatured(-1)}>&#8249;</button>
                <div className="featured-scroll" ref={featuredScrollRef}>
                  {[...featuredItems, ...featuredItems].map((product, i) => {
                    const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
                    return (
                      <div className="featured-card" key={`${product.id}-${i}`} onClick={() => navigate(`/product/${product.id}`)}>
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="featured-badge">-{Math.round(product.discountPercentage)}%</div>
                        <p className="featured-title">{product.title}</p>
                        <p className="featured-original-price">${originalPrice}</p>
                        <p className="featured-price">${product.price}</p>
                      </div>
                    )
                  })}
                </div>
                <button className="carousel-arrow carousel-arrow-right" onClick={() => scrollFeatured(1)}>&#8250;</button>
              </div>
            </div>
            <div className="products-toolbar" id="products">
              <h2 className="section-title" style={{padding: 0}}>
                Our Products{selectedCategory && <span className="category-filter-label"> — {selectedCategory}</span>}
              </h2>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
            <div className="grid">
              {loading ? (
                Array(8).fill(null).map((_, i) => <div key={i} className="product-skeleton" />)
              ) : sortedProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found</p>
                  <button onClick={() => { setSelectedCategory(''); setSearch('') }}>Clear filters</button>
                </div>
              ) : (
                sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.thumbnail}
                    id={product.id}
                    rating={product.rating}
                    addToCart={() => addToCart(product)}
                  />
                ))
              )}
            </div>
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} incrementCart={incrementCart} removeFromCart={removeFromCart} clearFromCart={clearFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
