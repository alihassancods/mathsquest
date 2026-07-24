import { useCallback, useEffect, useState } from 'react'
import { ProgressData } from '../types'
import { defaultProgress, loadProgress, saveProgress } from '../utils/storage'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeStage = useCallback((stageId: number) => {
    setProgress(prev => {
      const nextStage = stageId + 1
      const completed = prev.completedStages.includes(stageId)
        ? prev.completedStages
        : [...prev.completedStages, stageId]
      const unlocked = prev.unlockedStages.includes(nextStage)
        ? prev.unlockedStages
        : [...prev.unlockedStages, nextStage]

      const xpGain = 25
      const coinGain = 10
      const newXp = prev.xp + xpGain
      const newCoins = prev.coins + coinGain
      const newLevel = Math.floor(newXp / 100) + 1

      return {
        ...prev,
        completedStages: completed,
        unlockedStages: unlocked,
        stars: prev.stars + 3,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
      }
    })
  }, [])

  const recordAnswer = useCallback((correct: boolean) => {
    setProgress(prev => {
      const total = prev.totalQuestionsAnswered + 1
      const correctTotal = prev.totalCorrect + (correct ? 1 : 0)
      const streak = correct ? prev.bestStreak + 1 : 0
      return {
        ...prev,
        totalQuestionsAnswered: total,
        totalCorrect: correctTotal,
        bestStreak: Math.max(prev.bestStreak, streak),
        accuracy: total > 0 ? Math.round((correctTotal / total) * 100) : 0,
      }
    })
  }, [])

  const addCoins = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }))
  }, [])

  const addXp = useCallback((amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount
      return {
        ...prev,
        xp: newXp,
        level: Math.floor(newXp / 100) + 1,
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress())
  }, [])

  return {
    progress,
    completeStage,
    recordAnswer,
    addCoins,
    addXp,
    resetProgress,
  }
}
