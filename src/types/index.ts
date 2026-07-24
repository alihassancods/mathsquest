export interface StageDef {
  id: number
  operation: 'add'
  addend: number
  rangeMin: number
  rangeMax: number
  label: string
}

export interface Question {
  a: number
  b: number
  answer: number
  visualTheme: VisualTheme
  displayText: string
}

export type VisualTheme =
  | 'apples' | 'bananas' | 'strawberries' | 'grapes' | 'oranges'
  | 'mangoes' | 'stars' | 'balloons' | 'candy' | 'flowers'
  | 'clouds' | 'hearts' | 'fish' | 'butterflies' | 'cars'

export interface ProgressData {
  version: 1
  unlockedStages: number[]
  completedStages: number[]
  stars: number
  xp: number
  coins: number
  level: number
  bestStreak: number
  accuracy: number
  totalQuestionsAnswered: number
  totalCorrect: number
}

export type NodeState = 'locked' | 'unlocked' | 'completed' | 'current'
