import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const MapPage = lazy(() => import('../pages/MapPage'))
const StagePage = lazy(() => import('../pages/StagePage'))
const CompletedPage = lazy(() => import('../pages/CompletedPage'))

export const routes: RouteObject[] = [
  { path: '/', element: <MapPage /> },
  { path: '/stage/:id', element: <StagePage /> },
  { path: '/completed', element: <CompletedPage /> },
]
