import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { STAGES } from '../data/stages'
import { generateQuestion, generateDistractors } from '../utils/questionGenerator'
import { useProgress } from '../hooks/useProgress'
import { Question } from '../types'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import AnswerGrid from '../components/AnswerGrid'

const TOTAL_QUESTIONS = 10

export default function StagePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { progress, completeStage, recordAnswer } = useProgress()

  const stageId = Number(id)
  const stage = STAGES.find(s => s.id === stageId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const questions = useMemo<Question[]>(() => {
    if (!stage) return []
    return Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(stage))
  }, [stage])

  const currentQuestion = questions[currentIndex]

  const options = useMemo(() => {
    if (!currentQuestion) return []
    return generateDistractors(currentQuestion.answer, 3)
  }, [currentQuestion])

  const handleSelect = useCallback((value: number) => {
    if (revealed || !currentQuestion) return

    setSelected(value)
    setRevealed(true)

    const correct = value === currentQuestion.answer
    setIsCorrect(correct)
    recordAnswer(correct)

    if (correct) {
      setCorrectCount(prev => {
        const newCount = prev + 1
        if (newCount >= TOTAL_QUESTIONS) {
          completeStage(stageId)
        }
        return newCount
      })
    }
  }, [revealed, currentQuestion, recordAnswer, completeStage, stageId])

  const handleNext = useCallback(() => {
    if (!isCorrect) {
      // Wrong answer — retry same question
      setSelected(null)
      setRevealed(false)
      return
    }

    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelected(null)
      setRevealed(false)
      setIsCorrect(false)
    } else {
      // All done!
      navigate('/completed', { state: { stageId, xp: 25, coins: 10 } })
    }
  }, [currentIndex, isCorrect, navigate, stageId])

  // Handle retry on wrong answer
  const handleRetry = useCallback(() => {
    setSelected(null)
    setRevealed(false)
    setIsCorrect(false)
  }, [])

  if (!stage || !currentQuestion) {
    return (
      <div className="stage-page">
        <TopBar progress={progress} />
        <main className="stage-page__error">
          <p>Stage not found</p>
          <button onClick={() => navigate('/')} className="juicy-button--primary">
            Back to Map
          </button>
        </main>
      </div>
    )
  }

  const allComplete = correctCount >= TOTAL_QUESTIONS && currentIndex >= TOTAL_QUESTIONS - 1

  return (
    <div className="stage-page">
      <TopBar progress={progress} />

      <main className="stage-page__content">
        <ProgressBar current={revealed && isCorrect ? currentIndex + 1 : currentIndex} total={TOTAL_QUESTIONS} />

        <QuestionCard question={currentQuestion} />

        <AnswerGrid
          options={options}
          correct={currentQuestion.answer}
          selected={selected}
          revealed={revealed}
          disabled={allComplete}
          onSelect={handleSelect}
        />

        {revealed && (
          <div className="stage-page__actions">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="juicy-button--primary"
              >
                {currentIndex < TOTAL_QUESTIONS - 1 ? 'Next Question →' : 'See Results →'}
              </button>
            ) : (
              <button onClick={handleRetry} className="juicy-button--secondary">
                Try Again 😊
              </button>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
