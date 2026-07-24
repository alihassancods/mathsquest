import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { STAGES } from '../data/stages'
import { NodeState } from '../types'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import StageNode from '../components/StageNode'
import FallingStars from '../components/FallingStars'

export default function MapPage() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  function getNodeState(stageId: number): NodeState {
    if (progress.completedStages.includes(stageId)) return 'completed'
    if (progress.unlockedStages.includes(stageId)) {
      const sortedUnlocked = [...progress.unlockedStages].sort((a, b) => a - b)
      const current = sortedUnlocked[sortedUnlocked.length - 1]
      if (stageId === current && !progress.completedStages.includes(stageId)) return 'current'
      return 'unlocked'
    }
    return 'locked'
  }

  function handleNodeClick(stageId: number) {
    const state = getNodeState(stageId)
    if (state !== 'locked') {
      navigate(`/stage/${stageId}`)
    }
  }

  // Alternating zigzag: even indices go left, odd go right
  const evenRow = (i: number) => i % 2 === 0

  return (
    <div className="map-page">
      <TopBar progress={progress} />
      <FallingStars />

      <main className="map-container">
        {/* Floating clouds */}
        <div className="map-cloud map-cloud--1 animate-float" />
        <div className="map-cloud map-cloud--2 animate-float" style={{ animationDelay: '-1s' }} />
        <div className="map-cloud map-cloud--3 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="map-cloud map-cloud--4 animate-float" style={{ animationDelay: '-4.5s' }} />

        {/* Decorative tree */}
        <div className="map-tree map-tree--1">
          <div className="map-tree__top" />
          <div className="map-tree__trunk" />
        </div>
        <div className="map-tree map-tree--2">
          <div className="map-tree__top" />
          <div className="map-tree__trunk" />
        </div>

        {/* Rolling hills */}
        <div className="rolling-hills">
          <svg className="hills hills--back" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0 100C150 100 250 50 400 70C550 90 650 30 800 50C950 70 1000 100 1000 100H0Z" />
          </svg>
          <svg className="hills hills--front" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ animationDelay: '-3s' }}>
            <path d="M0 100C150 100 250 20 400 40C550 60 650 0 800 20C950 40 1000 100 1000 100H0Z" />
          </svg>
        </div>

        <div className="map-nodes">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="map-path-node-group">
              {/* Connecting line between nodes (except after last) */}
              {i < STAGES.length - 1 && (
                <div className={`map-connector map-connector--${evenRow(i) ? 'right' : 'left'}`}>
                  <div className="map-connector__line" />
                  <div className="map-connector__dot" />
                </div>
              )}

              <div
                className={`map-node-wrapper ${evenRow(i) ? 'map-node-wrapper--left' : 'map-node-wrapper--right'}`}
              >
                <StageNode
                  id={stage.id}
                  label={stage.label}
                  state={getNodeState(stage.id)}
                  onClick={() => handleNodeClick(stage.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
