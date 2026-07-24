import { Question } from '../types'
import { getThemeEmoji } from '../utils/questionGenerator'

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const emoji = getThemeEmoji(question.visualTheme)

  // Build visual groups: repeat emoji up to 6 times max
  const groupA = Array.from({ length: Math.min(question.a, 8) }, (_, i) => (
    <span key={`a-${i}`} className="question-emoji" style={{ animationDelay: `${i * 0.1}s` }}>
      {emoji}
    </span>
  ))
  const groupB = Array.from({ length: Math.min(question.b, 8) }, (_, i) => (
    <span key={`b-${i}`} className="question-emoji" style={{ animationDelay: `${i * 0.1}s` }}>
      {emoji}
    </span>
  ))

  return (
    <div className="question-card float-island">
      <div className="question-card__sparkle">
        <span className="material-symbols-outlined">auto_awesome</span>
      </div>

      <div className="question-card__content">
        <div className="question-card__groups">
          <div className="question-card__group">{groupA}</div>
          <span className="question-card__op">+</span>
          <div className="question-card__group">{groupB}</div>
          <span className="question-card__op">=</span>
          <div className="question-card__answer-box">
            <span className="question-card__answer-q">?</span>
          </div>
        </div>

        <p className="question-card__text">
          How many in total?
        </p>
      </div>
    </div>
  )
}
