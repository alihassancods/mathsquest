import { StageDef } from '../types'

const ranges: [number, number][] = [
  [0, 9],     // stage 1  — single digit
  [0, 9],     // stage 2  — single digit, harder random
  [11, 30],   // stage 3  — teens / twenties
  [11, 30],   // stage 4  — teens / twenties
  [100, 199], // stage 5  — hundreds low
  [200, 499], // stage 6  — hundreds mid
  [500, 999], // stage 7  — hundreds high
  [1000, 1999], // stage 8  — thousands low
  [2000, 5999], // stage 9  — thousands mid
  [6000, 9999], // stage 10 — thousands high
]

const labels = [
  'Apple Meadow', 'Starlight Farm', 'Candy Bridge', 'Rainbow Hill',
  'Golden Cove', 'Emerald Forest', 'Diamond Peak', 'Crystal Lake',
  'Moonlight Tower', 'Sunset Castle',
  'Berry Garden', 'Cloud Nine', 'Honeycomb Valley', 'Pixie Glen',
  'Sapphire Shore', 'Ruby Ridge', 'Amber Dunes', 'Pearl Lagoon',
  'Coral Reef', 'Jade Temple',
  'Blossom Park', 'Firefly Woods', 'Frost Mountain', 'Thunder Plateau',
  'Silver Stream', 'Oasis Springs', 'Starfall Field', 'Mist Gorge',
  'Lavender Plains', 'Royal Haven',
]

function buildStages(): StageDef[] {
  const stages: StageDef[] = []
  for (let group = 1; group <= 3; group++) {
    for (let i = 0; i < 10; i++) {
      const stageNum = (group - 1) * 10 + i + 1
      const [min, max] = ranges[i]
      stages.push({
        id: stageNum,
        operation: 'add',
        addend: group,
        rangeMin: min,
        rangeMax: max,
        label: labels[stageNum - 1] ?? `Stage ${stageNum}`,
      })
    }
  }
  return stages
}

export const STAGES = buildStages()
