import { Question, StageDef, VisualTheme } from '../types'

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

  return {
    a,
    b,
    answer: a + b,
    visualTheme: theme,
    displayText: `${a} + ${b}`,
  }
}

export function generateStageQuestions(stage: StageDef, count: number): Question[] {
  const questions: Question[] = []
  const usedA = new Set<number>()

  const rangeSize = stage.rangeMax - stage.rangeMin + 1
  const actualCount = Math.min(count, rangeSize)

  while (questions.length < actualCount) {
    const a = randInt(stage.rangeMin, stage.rangeMax)
    if (!usedA.has(a)) {
      usedA.add(a)
      const theme = themes[randInt(0, themes.length - 1)]
      questions.push({
        a,
        b: stage.addend,
        answer: a + stage.addend,
        visualTheme: theme,
        displayText: `${a} + ${stage.addend}`,
      })
    }
  }

  while (questions.length < count) {
    const a = randInt(stage.rangeMin, stage.rangeMax)
    const theme = themes[randInt(0, themes.length - 1)]
    questions.push({
      a,
      b: stage.addend,
      answer: a + stage.addend,
      visualTheme: theme,
      displayText: `${a} + ${stage.addend}`,
    })
  }

  return questions
}

export function getThemeEmoji(theme: VisualTheme): string {
  return themeEmoji[theme]
}

export function getThemeLabel(theme: VisualTheme): string {
  return themeLabels[theme]
}

/**
 * Generate answer options including the correct answer + unique distractors.
 * Guarantees the correct answer is always in the returned array.
 */
export function generateOptions(correct: number, count: number = 4): number[] {
  const options: number[] = [correct]

  while (options.length < count) {
    const offset = randInt(1, 5)
    const sign = Math.random() > 0.5 ? 1 : -1
    const candidate = Math.max(0, correct + sign * offset)
    if (!options.includes(candidate)) {
      options.push(candidate)
    }
  }

  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [options[i], options[j]] = [options[j], options[i]]
  }

  return options
}
