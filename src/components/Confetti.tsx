import { useEffect, useRef } from 'react'

const COLORS = ['#0ea5e9', '#ffc329', '#00b351', '#f9bd22', '#ffdf9f']

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pieces: HTMLDivElement[] = []

    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div')
      el.className = 'confetti-piece'
      el.style.left = `${Math.random() * 100}%`
      el.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.style.width = `${10 + Math.random() * 10}px`
      el.style.height = `${10 + Math.random() * 10}px`
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
      el.style.animationDuration = `${3 + Math.random() * 2}s`
      el.style.animationDelay = `${Math.random() * 3}s`
      container.appendChild(el)
      pieces.push(el)
    }

    return () => {
      pieces.forEach(p => p.remove())
    }
  }, [])

  return <div ref={containerRef} className="confetti-container" />
}
