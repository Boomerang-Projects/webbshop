import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  qty: number
}

function Checkout({ cart, clearCart }: { cart: CartItem[]; clearCart: () => void }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  })

  // Formaterar kortuppgifter automatiskt: kortnummer i grupper om 4, utgångsdatum med /, CVV max 3 siffror
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    if (name === 'cardNumber')
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    if (name === 'expiry')
      value = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2')
    if (name === 'cvv')
      value = value.replace(/\D/g, '').slice(0, 3)
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Validerar att alla fält är ifyllda innan ordern läggs och kundvagnen töms
  const handleSubmit = () => {
    const { name, email, address, city, zip, cardNumber, expiry, cvv } = form
    if (!name || !email || !address || !city || !zip || !cardNumber || !expiry || !cvv) {
      alert('Please fill in all fields')
      return
    }
    clearCart()
    navigate('/confirmation')
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h1 className="checkout-heading">Checkout</h1>

        <section className="checkout-section">
          <h2>Contact</h2>
          <div className="checkout-row">
            <input name="name"  type="text"  placeholder="Full Name"  onChange={handleChange} />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} />
          </div>
        </section>

        <section className="checkout-section">
          <h2>Shipping Address</h2>
          <input name="address" type="text" placeholder="Street Address" onChange={handleChange} />
          <div className="checkout-row">
            <input name="city" type="text" placeholder="City"     onChange={handleChange} />
            <input name="zip"  type="text" placeholder="ZIP Code" onChange={handleChange} inputMode="numeric" />
          </div>
        </section>

        <section className="checkout-section">
          <h2>Payment</h2>
          <input name="cardNumber" type="text" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} inputMode="numeric" />
          <div className="checkout-row">
            <input name="expiry" type="text" placeholder="MM/YY" value={form.expiry} onChange={handleChange} inputMode="numeric" />
            <input name="cvv"    type="text" placeholder="CVV"   value={form.cvv}    onChange={handleChange} inputMode="numeric" />
          </div>
        </section>

        <button className="checkout-submit" onClick={handleSubmit}>
          <Lock size={15} />
          Place Order · ${total.toFixed(2)}
        </button>
        <p className="checkout-secure">Your payment info is encrypted and secure.</p>
      </div>

      <div className="checkout-right">
        <h2 className="checkout-summary-title">Order Summary</h2>
        <div className="checkout-items">
          {cart.map(item => (
            <div className="checkout-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="checkout-item-info">
                <p>{item.title}</p>
                <span>Qty: {item.qty}</span>
              </div>
              <p className="checkout-item-price">${(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="checkout-summary-totals">
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="free">Free</span></div>
          <div className="summary-row total-row"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
