import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Confirmation from './Confirmation'
import Checkout from './Checkout'
import { Sparkles, Smartphone, Laptop, Sofa, Tag, ChevronDown, ChevronUp } from 'lucide-react'
import CookieBanner from './CookieBanner'
import Footer from './Footer'
import { ShopProvider, useShop } from './ShopContext'

// Själva sidinnehållet – läser allt från context via useShop()
function ShopContent() {
  const {
    products,
    cartToast,
    debouncedSearch,
    selectedCategory,
    selectCategory,
    setSelectedCategory,
    loading,
    sortBy,
    setSortBy,
    showAll,
    setShowAll,
    featuredScrollRef,
    scrollToProducts,
    addToCart,
    setSearch,
  } = useShop()

  const navigate = useNavigate()

  const featuredItems = products
    .filter(p => p.discountPercentage > 5)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 10)

  const scrollFeatured = (dir) => {
    featuredScrollRef.current?.scrollBy({ left: dir * 212, behavior: 'smooth' })
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating')     return b.rating - a.rating
    return 0
  })

  return (
    <div>
      <CookieBanner />
      {cartToast && <div className="cart-toast">Added to cart!</div>}
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <div className="hero">
              <div className="hero-inner">
                <p className="hero-tag">New Collection 2026</p>
                <h1 className="hero-title">Discover<br />Something<br />New.</h1>
                <button className="hero-btn" onClick={() => { setSelectedCategory(''); scrollToProducts() }}>
                  Shop the latest products &rarr;
                </button>
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
                (showAll ? sortedProducts : sortedProducts.slice(0, 16)).map(product => (
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
            {!loading && sortedProducts.length > 16 && (
              <div className="show-more-wrapper">
                <button className="show-more-btn" onClick={() => {
                  if (showAll) {
                    setShowAll(false)
                    scrollToProducts()
                  } else {
                    setShowAll(true)
                  }
                }}>
                  {showAll ? <><ChevronUp size={16} /> Show Less</> : <>{`Show All ${sortedProducts.length} Products`} <ChevronDown size={16} /></>}
                </button>
              </div>
            )}
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
    </div>
  )
}

// ShopProvider wrappar hela appen så att context finns tillgängligt överallt
function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  )
}

export default App
