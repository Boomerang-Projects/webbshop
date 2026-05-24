import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Confirmation from './Confirmation'
import Checkout from './Checkout'
import { useState, useEffect, useRef } from 'react'

function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => {
        console.error('Failed to fetch products:', error)
      })
  }, [])

  return (
    <div>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={
          <div>
            <input
              className="search-input"
              placeholder="Search products..."
              onChange={debounce((e) => setSearch(e.target.value), 350)}
            />
            <div className="grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail}
                  id={product.id}
                />
              ))}
            </div>
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}

export default App