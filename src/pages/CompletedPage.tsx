import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import TopBar from '../components/TopBar'
import Confetti from '../components/Confetti'
import FallingStars from '../components/FallingStars'

interface CompletedState {
  stageId: number
  xp: number
  coins: number
  details?: {
    perQuestionXp: number
    bonusXp: number
    perQuestionCoins: number
    bonusCoins: number
  }
}

export default function CompletedPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { progress } = useProgress()

  const state = location.state as CompletedState | null
  const stageId = state?.stageId ?? 0
  const xpEarned = state?.xp ?? 100
  const coinsEarned = state?.coins ?? 50
  const details = state?.details

  useEffect(() => {
    setTimeout(() => {
      const toast = document.getElementById('success-toast')
      if (toast) toast.classList.add('success-toast--visible')
    }, 300)
  }, [])

  function handleContinue() {
    navigate('/')
  }

  function handleReplay() {
    navigate(`/stage/${stageId}`)
  }

  return (
    <div className="completed-page">
      <Confetti />
      <FallingStars />

      <TopBar progress={progress} />

      <main className="completed-page__content">
        <div className="completed-card island-card">
          {/* Trophy */}
          <div className="completed-card__trophy">
            <div className="completed-card__trophy-glow" />
            <div className="completed-card__trophy-icon animate-float">
              <span className="completed-card__trophy-emoji">🏆</span>
              <span className="completed-card__sparkle completed-card__sparkle--1">✨</span>
              <span className="completed-card__sparkle completed-card__sparkle--2">✨</span>
            </div>
          </div>

          {/* Title */}
          <div className="completed-card__title">
            <h2 className="completed-card__heading animate-bounce-juicy">
              <span className="completed-card__stars">⭐⭐⭐</span>
              Stage Complete!
            </h2>
            <p className="completed-card__subtitle">
              You solved all the puzzles like a pro!
            </p>
          </div>

          {/* Stats — BIG numbers */}
          <div className="completed-card__stats">
            <div className="completed-card__stat">
              <span className="completed-card__stat-emoji">⭐</span>
              <span className="completed-card__stat-value completed-card__stat-value--big">{xpEarned}</span>
              <span className="completed-card__stat-label">XP EARNED</span>
            </div>
            <div className="completed-card__stat">
              <span className="completed-card__stat-emoji">🪙</span>
              <span className="completed-card__stat-value completed-card__stat-value--big">{coinsEarned}</span>
              <span className="completed-card__stat-label">COINS EARNED</span>
            </div>
          </div>

          {/* Breakdown */}
          {details && (
            <div className="completed-card__breakdown">
              <div className="completed-card__breakdown-row">
                <span>10 questions × {details.perQuestionXp / 10} XP</span>
                <span className="completed-card__breakdown-value">+{details.perQuestionXp} XP</span>
              </div>
              <div className="completed-card__breakdown-row">
                <span>Stage completion bonus</span>
                <span className="completed-card__breakdown-value">+{details.bonusXp} XP</span>
              </div>
              <div className="completed-card__breakdown-row completed-card__breakdown-row--total">
                <span>Total</span>
                <span className="completed-card__breakdown-value">{xpEarned} XP</span>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="completed-card__progress">
            <div className="completed-card__progress-track">
              <div
                className="completed-card__progress-fill"
                style={{ width: `${Math.min(100, (progress.completedStages.length / 30) * 100)}%` }}
              >
                <div className="completed-card__progress-glow" />
              </div>
            </div>
            <p className="completed-card__progress-label">{progress.completedStages.length} of 30 stages complete</p>
          </div>

          {/* Actions */}
          <div className="completed-card__actions">
            <button onClick={handleContinue} className="juicy-button--primary animate-bounce-juicy">
              Continue Adventure
              <span className="continue-arrow">→</span>
            </button>
            <button onClick={handleReplay} className="completed-card__replay">
              View Replay
            </button>
          </div>
        </div>
      </main>

      {/* Success toast */}
      <div id="success-toast" className="success-toast">
        <div className="success-toast__inner">
          <div className="success-toast__icon">
            <span>✅</span>
          </div>
          <div>
            <p className="success-toast__title">Perfect Score!</p>
            <p className="success-toast__sub">You're moving fast!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
