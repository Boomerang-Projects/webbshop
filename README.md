# MyShop — React Webshop

A fully functional e-commerce webshop built with React, Vite, and React Router. Products are fetched from the [DummyJSON](https://dummyjson.com/) API.

## Installation & Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- Product listing with search, sort, and category filtering
- Product detail page with image gallery and quantity selector
- Shopping cart with quantity controls and localStorage persistence
- Checkout form with auto-formatted card number, expiry, and CVV fields
- Order confirmation page with estimated delivery date
- Dark / light theme toggle
- EU cookie consent banner
- Hot Deals carousel (top discounted products)

## Debounce Implementation

The search input uses a debounce pattern to avoid filtering the product list on every single keystroke. Instead of running the filter immediately when the user types, a `setTimeout` of 300ms is set. If the user keeps typing, the previous timer is cleared via the `useEffect` cleanup function and a new one starts. Only when the user pauses for 300ms does `debouncedSearch` update and trigger the product filter.

```js
useEffect(() => {
  const timer = setTimeout(() => setDebouncedSearch(search), 300)
  return () => clearTimeout(timer)
}, [search])
```

The product list filters against `debouncedSearch` instead of the raw `search` value, which reduces unnecessary renders and improves performance.

## Error Handling (try...catch)

All API calls inside `useEffect` use `async/await` with `try...catch` blocks to safely handle network errors:

```js
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
```

The same pattern is applied on the product detail page when fetching a single product by ID. The `finally` block ensures the loading state is always cleared whether the request succeeds or fails.

## Tech Stack

- React 18 (functional components, hooks)
- Vite
- React Router v6
- Lucide React (icons)
- CSS (custom properties, dark/light theme via `data-theme` attribute)
