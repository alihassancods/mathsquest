import { Question } from '../types'
import { getThemeEmoji } from '../utils/questionGenerator'
import { generateQuestionStory } from '../utils/storyGenerator'

interface QuestionCardProps {
  question: Question
  stageId: number
}

export default function QuestionCard({ question, stageId }: QuestionCardProps) {
  const emoji = getThemeEmoji(question.visualTheme)
  const storyText = generateQuestionStory(question, stageId)

  // Build visual groups for stage <= 2: repeat emoji up to 8 times max
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
        <span className="question-card__sparkle-icon">✨</span>
      </div>

      <div className="question-card__content">
        {/* Story Box at the top */}
        <div className="question-card__story-box animate-float">
          <p className="question-card__story-text">{storyText}</p>
        </div>

        {/* Explicit equation text */}
        <div className="question-card__equation">
          <span className="question-card__num">{question.a}</span>
          <span className="question-card__op-text">+</span>
          <span className="question-card__num">{question.b}</span>
          <span className="question-card__op-text">=</span>
          <span className="question-card__num question-card__num--unknown">?</span>
        </div>

        {/* Adaptive visual representation */}
        {stageId <= 2 ? (
          <div className="question-card__groups">
            <div className="question-card__group">{groupA}</div>
            <span className="question-card__op">+</span>
            <div className="question-card__group">{groupB}</div>
            <span className="question-card__op">=</span>
            <div className="question-card__answer-box">
              <span className="question-card__answer-q">?</span>
            </div>
          </div>
        ) : (
          <div className="question-card__groups question-card__groups--cartoon">
            <div className="question-card__cartoon-operand animate-float">
              <span className="question-card__cartoon-number">{question.a}</span>
              <div className="question-card__cartoon-mascot">
                <img src="/doraemon_mascot.jpg" alt="Doraemon" className="mascot-image-small animate-bounce-juicy" />
                <span className="mascot-badge">{emoji}</span>
              </div>
            </div>

            <span className="question-card__op">+</span>

            <div className="question-card__cartoon-operand animate-float" style={{ animationDelay: '-1.5s' }}>
              <span className="question-card__cartoon-number">{question.b}</span>
              <div className="question-card__cartoon-mascot">
                <img src="/doraemon_mascot.jpg" alt="Doraemon" className="mascot-image-small animate-bounce-juicy" style={{ animationDelay: '-1.5s' }} />
                <span className="mascot-badge">{emoji}</span>
              </div>
            </div>

            <span className="question-card__op">=</span>

            <div className="question-card__answer-box question-card__answer-box--cartoon">
              <span className="question-card__answer-q">?</span>
            </div>
          </div>
        )}

        <p className="question-card__text">
          How many in total?
        </p>
      </div>
    </div>
  )
}
