import { useCallback, useEffect, useState } from 'react'
import { ProgressData } from '../types'
import { defaultProgress, loadProgress, saveProgress } from '../utils/storage'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)
  const [lastGain, setLastGain] = useState<{ xp: number; coins: number } | null>(null)

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

      const xpGain = 100
      const coinGain = 50
      const newXp = prev.xp + xpGain
      const newCoins = prev.coins + coinGain
      const newLevel = Math.floor(newXp / 100) + 1

      setLastGain({ xp: xpGain, coins: coinGain })

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

      const xpPerCorrect = 5
      const coinsPerCorrect = 2
      const newXp = prev.xp + (correct ? xpPerCorrect : 0)
      const newCoins = prev.coins + (correct ? coinsPerCorrect : 0)

      if (correct) {
        setLastGain({ xp: xpPerCorrect, coins: coinsPerCorrect })
      }

      return {
        ...prev,
        totalQuestionsAnswered: total,
        totalCorrect: correctTotal,
        bestStreak: Math.max(prev.bestStreak, streak),
        accuracy: total > 0 ? Math.round((correctTotal / total) * 100) : 0,
        xp: newXp,
        coins: newCoins,
        level: Math.floor(newXp / 100) + 1,
      }
    })
  }, [])

  const addCoins = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }))
    setLastGain({ xp: 0, coins: amount })
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
    setLastGain({ xp: amount, coins: 0 })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress())
    setLastGain(null)
  }, [])

  const clearLastGain = useCallback(() => setLastGain(null), [])

  const setProfile = useCallback((name: string, gender: 'boy' | 'girl' | 'neutral') => {
    setProgress(prev => ({
      ...prev,
      userName: name,
      userGender: gender,
    }))
  }, [])

  return {
    progress,
    lastGain,
    completeStage,
    recordAnswer,
    addCoins,
    addXp,
    resetProgress,
    clearLastGain,
    setProfile,
  }
}
