import { NodeState } from '../types'

interface StageNodeProps {
  id: number
  label: string
  state: NodeState
  onClick: () => void
  wobble?: boolean
  avatarUrl?: string
}

export default function StageNode({ id, label, state, onClick, wobble, avatarUrl }: StageNodeProps) {
  const stateClass = `stage-node--${state}`

  return (
    <div className={`stage-node ${stateClass} ${wobble ? 'animate-wobble' : ''}`}>
      {state === 'current' && (
        <div className="stage-node__avatar animate-float">
          <div className="stage-node__avatar-icon">
            <img
              src={avatarUrl || '/boy_explorer_mascot.jpg'}
              alt="You"
              className="stage-node__avatar-img"
            />
          </div>
          <div className="stage-node__you-badge">YOU 🚩</div>
        </div>
      )}

      <button
        onClick={onClick}
        className={`stage-node__circle ${state === 'current' ? 'node-active' : ''} ${state !== 'locked' ? 'juicy-button-press' : ''}`}
      >
        {state === 'locked' ? (
          <span className="stage-node__lock-emoji">🔒</span>
        ) : (
          <span className="stage-node__number">{id}</span>
        )}

        {state === 'completed' && (
          <>
            <div className="stage-node__stars">
              <span className="stage-node__star stage-node__star--1">⭐</span>
              <span className="stage-node__star stage-node__star--2">⭐</span>
              <span className="stage-node__star stage-node__star--3">⭐</span>
            </div>
            <div className="stage-node__check">
              <svg viewBox="0 0 24 24" width="20" height="20" className="stage-node__check-svg">
                <path
                  d="M3 12l6 6 12-12"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stage-node__check-path"
                />
              </svg>
            </div>
          </>
        )}

        {state === 'current' && (
          <div className="stage-node__sparkle">
            <span className="stage-node__sparkle-emoji animate-sparkle">✨</span>
          </div>
        )}
      </button>

      <div className={`stage-node__label stage-node__label--${state}`}>
        {label}
      </div>
    </div>
  )
}
