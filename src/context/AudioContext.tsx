import React, { createContext, useContext, useEffect, useRef } from 'react'
import { usePortfolioStore } from '../store/usePortfolioStore'

interface AudioContextType {
  playClick: () => void
  playBeep: (frequency?: number, type?: OscillatorType, duration?: number) => void
  playSuccess: () => void
  playError: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const soundEffectsEnabled = usePortfolioStore((state) => state.soundEffectsEnabled)
  
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  // Initialize Web Audio Context on first interaction
  const initAudio = () => {
    return null
  }

  // Play micro sound effects
  const playBeep = (freq = 800, type: OscillatorType = 'sine', duration = 0.05) => {
    // Sound globally deactivated
  }

  const playClick = () => {
    // Sound globally deactivated
  }

  const playSuccess = () => {
    // Sound globally deactivated
  }

  const playError = () => {
    // Sound globally deactivated
  }

  // Prime the AudioContext on any user interaction to bypass browser autoplay blocks
  useEffect(() => {
    // Sound globally deactivated
  }, [])

  // Attach global window listeners for clicks to trigger micro sounds
  useEffect(() => {
    // Sound globally deactivated
  }, [soundEffectsEnabled])

  return (
    <AudioContext.Provider value={{ playClick, playBeep, playSuccess, playError }}>
      {children}
    </AudioContext.Provider>
  )
}


export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
