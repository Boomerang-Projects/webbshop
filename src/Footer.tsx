import { useNavigate } from 'react-router-dom'
import { Globe, Share2, Rss, Link2 } from 'lucide-react'

function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo" onClick={() => navigate('/')}>MyShop</h2>
          <p className="footer-tagline">Quality products, delivered to your door. Trusted by thousands of happy customers worldwide.</p>
          <div className="footer-social">
            <span><Globe size={18} /></span>
            <span><Share2 size={18} /></span>
            <span><Rss size={18} /></span>
            <span><Link2 size={18} /></span>
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li onClick={() => navigate('/')}>All Products</li>
              <li>Tech</li>
              <li>Fashion</li>
              <li>Beauty & Health</li>
              <li>Home & Living</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>FAQ</li>
              <li>Shipping Info</li>
              <li>Returns & Refunds</li>
              <li>Track My Order</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} MyShop. All rights reserved.</p>
        <div className="footer-payments">
          <span>VISA</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>Apple Pay</span>
          <span>Google Pay</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
