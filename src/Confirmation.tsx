import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'

const steps = [
  { icon: CheckCircle, label: 'Order Placed' },
  { icon: Package,      label: 'Processing'  },
  { icon: Truck,        label: 'Shipped'     },
  { icon: Home,         label: 'Delivered'   },
]

function Confirmation() {
  const navigate = useNavigate()
  const [orderNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  )

  const delivery = new Date()
  delivery.setDate(delivery.getDate() + 5)
  const deliveryStr = delivery.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <CheckCircle size={40} strokeWidth={1.5} />
        </div>

        <h1 className="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-sub">
          Thank you for your purchase. We've received your order and will have it ready for shipping shortly.
        </p>

        <div className="confirmation-meta">
          <div className="confirmation-meta-item">
            <span className="meta-label">Order number</span>
            <span className="meta-value">#{orderNumber}</span>
          </div>
          <div className="confirmation-meta-divider" />
          <div className="confirmation-meta-item">
            <span className="meta-label">Estimated delivery</span>
            <span className="meta-value">{deliveryStr}</span>
          </div>
        </div>

        <div className="confirmation-steps">
          {steps.map((step, i) => {
            const Icon = step.icon
            const active = i === 0
            return (
              <div key={i} className="confirmation-step-wrapper">
                <div className={`confirmation-step ${active ? 'active' : ''}`}>
                  <div className="step-icon"><Icon size={18} /></div>
                  <span>{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`step-connector ${active ? 'active' : ''}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="confirmation-actions">
          <button className="confirmation-cta" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
