import { Question, StageDef, VisualTheme } from '../types'
// ponytail: no named export needed — Question is re-exported from types

const themes: VisualTheme[] = [
  'apples', 'bananas', 'strawberries', 'grapes', 'oranges',
  'mangoes', 'stars', 'balloons', 'candy', 'flowers',
  'clouds', 'hearts', 'fish', 'butterflies', 'cars',
]

const themeEmoji: Record<VisualTheme, string> = {
  apples: '🍎', bananas: '🍌', strawberries: '🍓', grapes: '🍇', oranges: '🍊',
  mangoes: '🥭', stars: '⭐', balloons: '🎈', candy: '🍬', flowers: '🌸',
  clouds: '☁️', hearts: '❤️', fish: '🐟', butterflies: '🦋', cars: '🚗',
}

const themeLabels: Record<VisualTheme, string> = {
  apples: 'apples', bananas: 'bananas', strawberries: 'strawberries',
  grapes: 'grapes', oranges: 'oranges', mangoes: 'mangoes',
  stars: 'stars', balloons: 'balloons', candy: 'candies',
  flowers: 'flowers', clouds: 'clouds', hearts: 'hearts',
  fish: 'fish', butterflies: 'butterflies', cars: 'cars',
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateQuestion(stage: StageDef): Question {
  const a = randInt(stage.rangeMin, stage.rangeMax)
  const b = stage.addend
  const theme = themes[randInt(0, themes.length - 1)]

  const emoji = themeEmoji[theme]

  return {
    a,
    b,
    answer: a + b,
    visualTheme: theme,
    displayText: `${a} ${emoji} + ${b} ${emoji}`,
    // For the visual display, we'll use the emoji repeated
  }
}

export function getThemeEmoji(theme: VisualTheme): string {
  return themeEmoji[theme]
}

export function getThemeLabel(theme: VisualTheme): string {
  return themeLabels[theme]
}

export function generateDistractors(correct: number, count: number = 3): number[] {
  const distractors = new Set<number>()
  distractors.add(correct)

  while (distractors.size < count + 1) {
    const offset = randInt(1, 5)
    const sign = Math.random() > 0.5 ? 1 : -1
    const candidate = Math.max(0, correct + sign * offset)
    distractors.add(candidate)
  }

  const shuffled = Array.from(distractors)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}
