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
        else if (showWrong) btnClass += ' answer-btn--wrong answer-btn--shake'
        else if (isSelected) btnClass += ' answer-btn--selected'

        // If wrong was picked, also highlight correct so child sees the right answer
        if (revealed && isCorrect && selected !== correct) {
          btnClass += ' answer-btn--reveal-correct'
        }

        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            disabled={disabled || (revealed && selected !== null)}
            className={btnClass}
          >
            <span className="answer-btn__value">{opt}</span>
            {showCorrect && (
              <div className="answer-btn__badge animate-sparkle">
                <span className="answer-btn__star">⭐</span>
              </div>
            )}
          </button>
        )
      })}

      {revealed && selected !== null && (
        <div className={`answer-grid__banner ${selected === correct ? 'answer-grid__banner--correct' : 'answer-grid__banner--wrong'}`}>
          {selected === correct ? (
            <>{encouragement}</>
          ) : (
            <><span className="answer-grid__banner-shake">✖</span> Almost! Try again 😊</>
          )}
        </div>
      )}
    </div>
  )
}
