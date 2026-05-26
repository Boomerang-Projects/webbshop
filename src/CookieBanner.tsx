import { useState } from 'react'

function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookieConsent'))

  if (!visible) return null

  const handle = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('cookieConsent', choice)
    setVisible(false)
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-text">
        <p className="cookie-title">We use cookies</p>
        <p className="cookie-desc">
          We use cookies to improve your experience and analyse site traffic.
          By clicking "Accept" you consent to our use of cookies.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-reject" onClick={() => handle('rejected')}>Reject</button>
        <button className="cookie-btn cookie-accept" onClick={() => handle('accepted')}>Accept</button>
      </div>
    </div>
  )
}

export default CookieBanner
