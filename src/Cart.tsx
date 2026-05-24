import { useNavigate } from 'react-router-dom'

function Cart({ cart }) {
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${item.price}</p>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="detail-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart