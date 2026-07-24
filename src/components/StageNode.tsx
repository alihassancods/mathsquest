import { NodeState } from '../types'

interface StageNodeProps {
  id: number
  label: string
  state: NodeState
  onClick: () => void
}

export default function StageNode({ id, label, state, onClick }: StageNodeProps) {
  const stateClass = `stage-node--${state}`

  return (
    <div className={`stage-node ${stateClass}`}>
      {state === 'current' && (
        <div className="stage-node__avatar">
          <div className="stage-node__avatar-icon">
            <span className="material-symbols-outlined">face</span>
          </div>
          <div className="stage-node__you-badge">You</div>
        </div>
      )}

      <button
        onClick={onClick}
        disabled={state === 'locked'}
        className={`stage-node__circle ${state === 'current' ? 'node-active' : ''} ${state !== 'locked' ? 'juicy-button-press' : ''}`}
      >
        {state === 'locked' ? (
          <span className="material-symbols-outlined">lock</span>
        ) : (
          <span className="stage-node__number">{id}</span>
        )}

        {state === 'completed' && (
          <>
            <div className="stage-node__stars">
              <span className="material-symbols-outlined star star--1">star</span>
              <span className="material-symbols-outlined star star--2">star</span>
              <span className="material-symbols-outlined star star--3">star</span>
            </div>
            <div className="stage-node__check">
              <span className="material-symbols-outlined">check</span>
            </div>
          </>
        )}

        {state === 'current' && (
          <div className="stage-node__sparkle">
            <span className="material-symbols-outlined animate-sparkle">auto_awesome</span>
          </div>
        )}
      </button>

      <div className={`stage-node__label stage-node__label--${state}`}>
        {label}
      </div>
    </div>
  )
}
