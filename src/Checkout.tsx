import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.email) {
      alert('Please fill in all fields')
      return
    }
    navigate('/confirmation')
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <div className="cart-total">
        <p>Total: ${total.toFixed(2)}</p>
        <button className="detail-btn" onClick={handleSubmit}>
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Checkout