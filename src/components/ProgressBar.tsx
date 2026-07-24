interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="progress-bar">
      <div className="progress-bar__labels">
        <span className="progress-bar__label">QUESTION {current} OF {total}</span>
        <span className="progress-bar__pct">{pct}% DONE!</span>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill candy-progress"
          style={{ width: `${pct}%` }}
        >
          <div className="progress-bar__glow" />
        </div>
      </div>
    </div>
  )
}
