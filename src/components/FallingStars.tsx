export default function FallingStars() {
  return (
    <div className="falling-stars">
      <div className="falling-stars__item" style={{ top: '20%', left: '10%', animationDelay: '0.5s' }}>
        <span>⭐</span>
      </div>
      <div className="falling-stars__item" style={{ top: '40%', right: '15%', animationDelay: '1.2s' }}>
        <span>⭐</span>
      </div>
      <div className="falling-stars__item" style={{ bottom: '60%', left: '20%', animationDelay: '0.8s' }}>
        <span>⭐</span>
      </div>
    </div>
  )
}
