export default function FallingStars() {
  return (
    <div className="falling-stars">
      <div className="falling-stars__item" style={{ top: '20%', left: '10%', animationDelay: '0.5s' }}>
        <span className="material-symbols-outlined">star</span>
      </div>
      <div className="falling-stars__item" style={{ top: '40%', right: '15%', animationDelay: '1.2s' }}>
        <span className="material-symbols-outlined">star</span>
      </div>
      <div className="falling-stars__item" style={{ bottom: '60%', left: '20%', animationDelay: '0.8s' }}>
        <span className="material-symbols-outlined">star</span>
      </div>
    </div>
  )
}
