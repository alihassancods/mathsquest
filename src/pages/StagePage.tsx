import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { STAGES } from '../data/stages'
import { generateQuestion, generateOptions } from '../utils/questionGenerator'
import { useProgress } from '../hooks/useProgress'
import { Question } from '../types'
import TopBar from '../components/TopBar'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import AnswerGrid from '../components/AnswerGrid'

const TOTAL_QUESTIONS = 10
const XP_PER_CORRECT = 5
const COINS_PER_CORRECT = 2
const XP_BONUS_STAGE = 100
const COINS_BONUS_STAGE = 50

export default function StagePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { progress, lastGain, completeStage, recordAnswer, clearLastGain } = useProgress()

  const stageId = Number(id)
  const stage = STAGES.find(s => s.id === stageId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [scorePopups, setScorePopups] = useState<{ id: number; xp: number; coins: number }[]>([])
  const popupIdRef = useRef(0)
  const [sessionXp, setSessionXp] = useState(0)
  const [sessionCoins, setSessionCoins] = useState(0)

  const questions = useMemo<Question[]>(() => {
    if (!stage) return []
    return Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(stage))
  }, [stage])

  const currentQuestion = questions[currentIndex]

  const options = useMemo(() => {
    if (!currentQuestion) return []
    return generateOptions(currentQuestion.answer, 4)
  }, [currentQuestion])

  // Show score popup when lastGain changes
  useEffect(() => {
    if (lastGain && (lastGain.xp > 0 || lastGain.coins > 0)) {
      const id = ++popupIdRef.current
      setScorePopups(prev => [...prev, { id, ...lastGain }])
      setTimeout(() => {
        setScorePopups(prev => prev.filter(p => p.id !== id))
      }, 1200)
      clearLastGain()
    }
  }, [lastGain, clearLastGain])

  const handleSelect = useCallback((value: number) => {
    if (revealed || !currentQuestion) return

    setSelected(value)
    setRevealed(true)

    const correct = value === currentQuestion.answer
    setIsCorrect(correct)
    recordAnswer(correct)

    if (correct) {
      setSessionXp(prev => prev + XP_PER_CORRECT)
      setSessionCoins(prev => prev + COINS_PER_CORRECT)
      setCorrectCount(prev => {
        const newCount = prev + 1
        if (newCount >= TOTAL_QUESTIONS) {
          completeStage(stageId)
          setSessionXp(s => s + XP_BONUS_STAGE)
          setSessionCoins(s => s + COINS_BONUS_STAGE)
        }
        return newCount
      })
    }
  }, [revealed, currentQuestion, recordAnswer, completeStage, stageId])

  const handleNext = useCallback(() => {
    if (!isCorrect) {
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
      navigate('/completed', {
        state: {
          stageId,
          xp: sessionXp + XP_BONUS_STAGE,
          coins: sessionCoins + COINS_BONUS_STAGE,
          details: {
            perQuestionXp: XP_PER_CORRECT * TOTAL_QUESTIONS,
            bonusXp: XP_BONUS_STAGE,
            perQuestionCoins: COINS_PER_CORRECT * TOTAL_QUESTIONS,
            bonusCoins: COINS_BONUS_STAGE,
          },
        },
      })
    }
  }, [currentIndex, isCorrect, navigate, stageId, sessionXp, sessionCoins])

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
        {/* Score popups (floating +XP / +Coins) */}
        <div className="score-popups">
          {scorePopups.map(p => (
            <div key={p.id} className="score-popup">
              {p.xp > 0 && <span className="score-popup--xp">+{p.xp} XP</span>}
              {p.coins > 0 && <span className="score-popup--coins">+{p.coins} 🪙</span>}
            </div>
          ))}
        </div>

        {/* Live score card */}
        <div className="live-score">
          <span>⭐ <strong>{sessionXp}</strong> XP</span>
          <span className="live-score__divider">|</span>
          <span>🪙 <strong>{sessionCoins}</strong></span>
          {progress.bestStreak > 0 && (
            <>
              <span className="live-score__divider">|</span>
              <span>🔥 <strong>{Math.min(progress.bestStreak, correctCount)}</strong></span>
            </>
          )}
        </div>

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
    </div>
  )
}
