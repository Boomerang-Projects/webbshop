import { createContext, useContext, useState, useEffect, useRef, RefObject, ReactNode } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  qty: number
  [key: string]: unknown
}

interface ShopContextType {
  products: CartItem[]
  cart: CartItem[]
  cartCount: number
  cartToast: boolean
  search: string
  setSearch: (val: string) => void
  debouncedSearch: string
  selectedCategory: string
  selectCategory: (cat: string) => void
  setSelectedCategory: (cat: string) => void
  loading: boolean
  sortBy: string
  setSortBy: (val: string) => void
  showAll: boolean
  setShowAll: (val: boolean) => void
  featuredScrollRef: RefObject<HTMLDivElement | null>
  scrollToProducts: () => void
  addToCart: (product: Omit<CartItem, 'qty'>) => void
  incrementCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearFromCart: (id: number) => void
  clearCart: () => void
}

// Skapar ett context-objekt som komponenter kan prenumerera på
const ShopContext = createContext<ShopContextType | null>(null)

// Anpassad hook – enkelt sätt att läsa context i vilken komponent som helst
export function useShop(): ShopContextType {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop måste användas inuti ShopProvider')
  return ctx
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartItem[]>([])
  // Läser kundvagnen från localStorage så den överlever sidladdningar
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [cartToast, setCartToast] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [showAll, setShowAll] = useState(false)
  const featuredScrollRef = useRef<HTMLDivElement>(null)

  // Sparar kundvagnen i localStorage varje gång den uppdateras
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Hämtar alla produkter vid sidstart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=200')
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Debounce: väntar 300ms efter att användaren slutat skriva innan sökningen uppdateras
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setShowAll(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const scrollToProducts = () => {
    const el = document.getElementById('products')
    const navbar = document.querySelector('.navbar-wrapper')
    if (!el) return
    const offset = ((navbar as HTMLElement | null)?.offsetHeight ?? 0) + 12
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!debouncedSearch) return
    scrollToProducts()
  }, [debouncedSearch])

  const selectCategory = (cat: string) => {
    setSelectedCategory(cat)
    setShowAll(false)
    setTimeout(scrollToProducts, 50)
  }

  // Om produkten redan finns i kundvagnen ökas antalet, annars läggs den till som ny rad
  const addToCart = (product: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartToast(true)
    setTimeout(() => setCartToast(false), 2000)
  }

  const incrementCart = (id: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id)
      if (existing?.qty > 1) return prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
      return prev.filter(item => item.id !== id)
    })
  }

  const clearFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  // Värden och funktioner som görs tillgängliga för alla barn-komponenter
  const value: ShopContextType = {
    products,
    cart,
    cartCount,
    cartToast,
    search,
    setSearch,
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
    incrementCart,
    removeFromCart,
    clearFromCart,
    clearCart,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
