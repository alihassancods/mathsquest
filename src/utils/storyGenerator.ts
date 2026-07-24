import { Question } from '../types'
import { getThemeEmoji } from './questionGenerator'

export function generateQuestionStory(question: Question, stageId: number): string {
  const a = question.a
  const b = question.b
  const emoji = getThemeEmoji(question.visualTheme)

  // Choose a cute character based on theme
  let character = 'Doraemon'
  if (question.visualTheme === 'bananas') character = 'Pip the Monkey'
  if (question.visualTheme === 'fish') character = 'Finny the Dolphin'
  if (question.visualTheme === 'cars') character = 'Rusty the Racecar'
  if (question.visualTheme === 'balloons') character = 'Penny the Bunny'

  const stories: Record<string, string[]> = {
    apples: [
      `${character} gathered ${a} sweet red apples ${emoji} from the magical orchard. On the way home, they found ${b} more apple ${emoji}!`,
      `There are ${a} shiny apples ${emoji} in the giant fruit basket. ${character} added ${b} fresh apple ${emoji} to the pile.`
    ],
    bananas: [
      `${character} climbed a tall banana tree and picked ${a} delicious bananas ${emoji}. Then they spotted ${b} more banana ${emoji} hiding in the leaves!`,
      `${character} wants to make a yummy banana split. They have ${a} bananas ${emoji} and bought ${b} more banana ${emoji}.`
    ],
    strawberries: [
      `A fairy dropped ${a} sweet strawberries ${emoji} in ${character}'s garden. Later, they picked ${b} more strawberry ${emoji}!`,
      `${character} picked ${a} juicy strawberries ${emoji}. Nobita gave them ${b} more strawberry ${emoji}.`
    ],
    grapes: [
      `${character} shared ${a} purple grapes ${emoji} with friends. Nobita brought another bunch of ${b} grape ${emoji}.`,
      `There are ${a} grapes ${emoji} hanging on the vine. ${character} harvested them and found ${b} more grape ${emoji} on the ground.`
    ],
    oranges: [
      `${character} squeezed ${a} fresh oranges ${emoji} for a morning juice. They need ${b} more orange ${emoji} to fill the pitcher.`,
      `In the sunny grove, ${character} collected ${a} bright oranges ${emoji}. A friendly bird dropped ${b} orange ${emoji} into the basket.`
    ],
    mangoes: [
      `${character} found ${a} golden mangoes ${emoji} in the jungle. A friendly monkey tossed ${b} more mango ${emoji} to them!`,
      `There are ${a} sweet mangoes ${emoji} on the table. Nobita brought ${b} more mango ${emoji}.`
    ],
    stars: [
      `${character} looked through a magical telescope and counted ${a} twinkling stars ${emoji}. Suddenly, ${b} new star ${emoji} shot across the sky!`,
      `A wizard conjured ${a} glowing stars ${emoji} to light up the night. He cast a spell to make ${b} more star ${emoji}.`
    ],
    balloons: [
      `${character} is blowing up balloons for a birthday party and has ${a} colorful balloons ${emoji}. Nobita brought ${b} more balloon ${emoji}!`,
      `There are ${a} helium balloons ${emoji} floating in the sky. ${character} caught them and added ${b} more balloon ${emoji} to the bunch.`
    ],
    candy: [
      `${character} opened a treasure chest and found ${a} magical candies ${emoji}. Shizuka gave them another ${b} piece of candy ${emoji}!`,
      `There are ${a} sweet candy drops ${emoji} in the jar. ${character} added ${b} more candy ${emoji} to it.`
    ],
    flowers: [
      `${character} planted ${a} beautiful flowers ${emoji} in the meadow. Today, ${b} new flower ${emoji} bloomed!`,
      `In the royal garden, ${character} picked a bouquet of ${a} flowers ${emoji}. They found ${b} more flower ${emoji} near the castle wall.`
    ],
    clouds: [
      `${character} saw ${a} fluffy white clouds ${emoji} shaped like animals. Soon, ${b} more cloud ${emoji} floated into view.`,
      `A sleepy dragon is resting on ${a} soft clouds ${emoji}. He puffed out ${b} more small cloud ${emoji}.`
    ],
    hearts: [
      `${character} sent ${a} love hearts ${emoji} to their best friends. They received ${b} more heart ${emoji} in return!`,
      `In a matching game, Nobita collected ${a} red hearts ${emoji} and ${character} got ${b} heart ${emoji}.`
    ],
    fish: [
      `${character} saw ${a} colorful fish ${emoji} swimming in the sparkling pond. Then, ${b} more little fish ${emoji} joined the school!`,
      `In the coral reef, ${a} shiny fish ${emoji} were playing hide and seek. ${character} spotted ${b} more fish ${emoji}.`
    ],
    butterflies: [
      `${character} watched ${a} fluttering butterflies ${emoji} land on the roses. Soon, ${b} more butterfly ${emoji} flew over.`,
      `There are ${a} beautiful butterflies ${emoji} flying in the sun. ${character} counted ${b} more butterfly ${emoji}.`
    ],
    cars: [
      `${character} is arranging ${a} fast race cars ${emoji} on the track. ${b} more car ${emoji} zoomed in to join the race!`,
      `In the toy shop, there are ${a} shiny model cars ${emoji}. The shopkeeper added ${b} new car ${emoji} to the shelf.`
    ]
  }

  const list = stories[question.visualTheme] || stories['apples']
  // Simple deterministic indexing so the story doesn't change on re-render
  const index = (a + b + stageId) % list.length
  return list[index]
}
