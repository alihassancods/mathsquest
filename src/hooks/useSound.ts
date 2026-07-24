import { useCallback } from 'react'

export function useSound() {
  // ponytail: no-op sound hooks — ready for audio assets later
  const playCorrect = useCallback(() => {}, [])
  const playWrong = useCallback(() => {}, [])
  const playComplete = useCallback(() => {}, [])
  const playClick = useCallback(() => {}, [])

  return { playCorrect, playWrong, playComplete, playClick }
}
