import React, { createContext, useContext, useEffect } from 'react'
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

  // Play micro sound effects
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playBeep = (_freq = 800, _type: OscillatorType = 'sine', _duration = 0.05) => {
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
