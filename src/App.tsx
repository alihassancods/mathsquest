import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './router'

export default function App() {
  const element = useRoutes(routes)

  return (
    <Suspense
      fallback={
        <div className="app-loading">
          <span className="app-loading__icon animate-sparkle">✨</span>
          <p>Loading...</p>
        </div>
      }
    >
      {element}
    </Suspense>
  )
}
