import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { STAGES } from '../data/stages'
import { NodeState } from '../types'
import TopBar from '../components/TopBar'
import StageNode from '../components/StageNode'
import FallingStars from '../components/FallingStars'

export default function MapPage() {
  const navigate = useNavigate()
  const { progress, setProfile } = useProgress()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [wobblingNodeId, setWobblingNodeId] = useState<number | null>(null)

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [profileName, setProfileName] = useState('')
  const [selectedGender, setSelectedGender] = useState<'boy' | 'girl' | 'neutral'>('boy')

  // Show onboarding popup if userName is not set
  useEffect(() => {
    if (!progress.userName) {
      setShowOnboarding(true)
    } else {
      setShowOnboarding(false)
    }
  }, [progress.userName])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!profileName.trim()) return
    setProfile(profileName.trim(), selectedGender)
    setShowOnboarding(false)
  }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

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
    } else {
      setWobblingNodeId(stageId)
      setToastMessage(`🔒 Stage ${stageId} is locked! Complete previous stages first.`)
      setTimeout(() => {
        setWobblingNodeId(null)
      }, 500)
    }
  }

  // Determine avatar URL based on selected mascot
  const getAvatarUrl = () => {
    if (progress.userGender === 'boy') return '/boy_explorer_mascot.jpg'
    if (progress.userGender === 'girl') return '/girl_explorer_mascot.jpg'
    if (progress.userGender === 'neutral') return '/doraemon_mascot.jpg'
    return '/boy_explorer_mascot.jpg'
  }

  // Alternating zigzag: even indices go left, odd go right
  const evenRow = (i: number) => i % 2 === 0

  return (
    <div className="map-page">
      <TopBar progress={progress} />
      <FallingStars />

      {toastMessage && (
        <div className="map-toast">
          <div className="map-toast__inner">
            <span className="map-toast__icon">🔒</span>
            <span className="map-toast__message">{toastMessage}</span>
          </div>
        </div>
      )}

      {showOnboarding && (
        <div className="onboarding-overlay">
          <div className="onboarding-modal float-island">
            <h2 className="onboarding-modal__title animate-bounce-juicy">🎒 Welcome, Math Explorer! 🚀</h2>
            <p className="onboarding-modal__subtitle">Let's set up your adventurer profile!</p>
            
            <form onSubmit={handleSaveProfile} className="onboarding-modal__form">
              <div className="form-group">
                <label className="form-label">What is your name?</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="form-input"
                  required
                  maxLength={15}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Choose your mascot character!</label>
                <div className="mascot-selector">
                  <button
                    type="button"
                    onClick={() => setSelectedGender('boy')}
                    className={`mascot-selector__option ${selectedGender === 'boy' ? 'mascot-selector__option--selected' : ''}`}
                  >
                    <img src="/boy_explorer_mascot.jpg" alt="Boy Explorer" className="mascot-selector__img" />
                    <span>Boy Explorer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGender('girl')}
                    className={`mascot-selector__option ${selectedGender === 'girl' ? 'mascot-selector__option--selected' : ''}`}
                  >
                    <img src="/girl_explorer_mascot.jpg" alt="Girl Explorer" className="mascot-selector__img" />
                    <span>Girl Explorer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGender('neutral')}
                    className={`mascot-selector__option ${selectedGender === 'neutral' ? 'mascot-selector__option--selected' : ''}`}
                  >
                    <img src="/doraemon_mascot.jpg" alt="Doraemon Cat" className="mascot-selector__img" />
                    <span>Doraemon Mascot</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="juicy-button--primary btn-large">
                Start Adventure! 🗺️
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="map-container">
        {/* Floating clouds */}
        <div className="map-cloud map-cloud--1 animate-float" />
        <div className="map-cloud map-cloud--2 animate-float" style={{ animationDelay: '-1.5s' }} />
        <div className="map-cloud map-cloud--3 animate-float" style={{ animationDelay: '-3.2s' }} />
        <div className="map-cloud map-cloud--4 animate-float" style={{ animationDelay: '-4.8s' }} />

        {/* Decorative trees */}
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
                  wobble={wobblingNodeId === stage.id}
                  avatarUrl={getAvatarUrl()}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
