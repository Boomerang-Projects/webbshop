import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Confirmation from './Confirmation'
import Checkout from './Checkout'
import { useState, useEffect, useRef } from 'react'
import { Sparkles, Smartphone, Laptop, Sofa } from 'lucide-react'

function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=200')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => {
        console.error('Failed to fetch products:', error)
      })
  }, [])

  return (
    <div>
      <Navbar cart={cart} setSelectedCategory={setSelectedCategory} />
      <Routes>
        <Route path="/" element={
          <div>
            <div className="hero">
              <p className="hero-tag">New Collection 2026</p>
              <h1 className="hero-title">Discover Something New</h1>
              <p className="hero-subtitle">Shop the latest products across all categories</p>
              <button className="hero-btn" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                Shop Now
              </button>
            </div>
            <div className="categories-section">
              <h2 className="section-title">Shop by Category</h2>
              <div className="categories-grid">
                <div className="category-card" onClick={() => setSelectedCategory('beauty')}>
                  <Sparkles size={32} />
                  <p>Beauty</p>
                </div>
                <div className="category-card" onClick={() => setSelectedCategory('smartphones')}>
                  <Smartphone size={32} />
                  <p>Smartphones</p>
                </div>
                <div className="category-card" onClick={() => setSelectedCategory('laptops')}>
                  <Laptop size={32} />
                  <p>Laptops</p>
                </div>
                <div className="category-card" onClick={() => setSelectedCategory('furniture')}>
                  <Sofa size={32} />
                  <p>Furniture</p>
                </div>
              </div>
            </div>
            <div className="grid" id="products">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail}
                  id={product.id}
                  rating={product.rating}
                />
              ))}
            </div>
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}

export default App