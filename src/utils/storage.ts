import { ProgressData } from '../types'

const STORAGE_KEY = 'mathquest_progress'
const CURRENT_VERSION = 1

export function defaultProgress(): ProgressData {
  return {
    version: CURRENT_VERSION,
    unlockedStages: [1],
    completedStages: [],
    stars: 0,
    xp: 0,
    coins: 0,
    level: 1,
    bestStreak: 0,
    accuracy: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
  }
}

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()

    const data = JSON.parse(raw) as ProgressData

    // Version migration placeholder
    if (data.version !== CURRENT_VERSION) {
      return migrate(data)
    }

    return data
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or unavailable — silently fail
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrate(data: any): ProgressData {
  // Future migrations go here
  return { ...defaultProgress(), ...data, version: CURRENT_VERSION }
}
