import { ProgressData } from '../types'

interface TopBarProps {
  progress: ProgressData
}

export default function TopBar({ progress }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__inner">
        <div className="top-bar__brand">
          <span className="top-bar__logo">MathQuest</span>
        </div>
        <div className="top-bar__stats">
          <div className="stat-chip stat-chip--xp">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="stat-chip__value">{progress.xp} XP</span>
          </div>
          <div className="stat-chip stat-chip--coins">
            <span className="material-symbols-outlined">monetization_on</span>
            <span className="stat-chip__value">{progress.coins}</span>
          </div>
          <div className="stat-chip stat-chip--streak">
            <span className="material-symbols-outlined">local_fire_department</span>
            <span className="stat-chip__value">{progress.bestStreak}</span>
          </div>
          <div className="stat-chip stat-chip--level">
            <span className="material-symbols-outlined">star</span>
            <span className="stat-chip__value">LVL {progress.level}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
