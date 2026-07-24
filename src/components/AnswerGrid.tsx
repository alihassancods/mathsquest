interface AnswerGridProps {
  options: number[]
  correct: number
  selected: number | null
  revealed: boolean
  disabled: boolean
  onSelect: (value: number) => void
}

const ENCOURAGEMENTS = [
  'Amazing! 🎉', 'Great Job! 🎉', 'Fantastic! 🎉',
  'Excellent! 🎉', 'Wonderful! 🎉', 'Super! 🎉',
  'Brilliant! 🎉', 'Outstanding! 🎉',
]

export default function AnswerGrid({
  options,
  correct,
  selected,
  revealed,
  disabled,
  onSelect,
}: AnswerGridProps) {
  const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]

  return (
    <div className="answer-grid">
      {options.map(opt => {
        const isCorrect = opt === correct
        const isSelected = opt === selected
        const showCorrect = revealed && isCorrect
        const showWrong = revealed && isSelected && !isCorrect

        let btnClass = 'answer-btn'
        if (showCorrect) btnClass += ' answer-btn--correct'
        else if (showWrong) btnClass += ' answer-btn--wrong'
        else if (isSelected) btnClass += ' answer-btn--selected'

        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            disabled={disabled || revealed}
            className={btnClass}
          >
            <span className="answer-btn__value">{opt}</span>
            {showCorrect && (
              <div className="answer-btn__badge animate-sparkle">
                <span className="material-symbols-outlined">star</span>
              </div>
            )}
          </button>
        )
      })}

      {revealed && selected === correct && (
        <div className="answer-grid__feedback answer-grid__feedback--correct">
          {encouragement}
        </div>
      )}
      {revealed && selected !== null && selected !== correct && (
        <div className="answer-grid__feedback answer-grid__feedback--wrong">
          Almost! Try again 😊
        </div>
      )}
    </div>
  )
}
