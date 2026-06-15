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
    if (ctxRef.current) return ctxRef.current

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.3, ctx.currentTime) // Clear, pleasant master volume
      masterGain.connect(ctx.destination)
      
      ctxRef.current = ctx
      masterGainRef.current = masterGain
      
      return ctx
    } catch (e) {
      console.error('Web Audio API not supported', e)
      return null
    }
  }

  // Play micro sound effects
  const playBeep = (freq = 800, type: OscillatorType = 'sine', duration = 0.05) => {
    if (!soundEffectsEnabled) return
    const ctx = initAudio()
    if (!ctx) return
    
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
    
    osc.connect(gainNode)
    gainNode.connect(masterGainRef.current || ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + duration)
  }

  const playClick = () => {
    // Soft wooden pop/click sound
    playBeep(320, 'triangle', 0.08)
  }

  const playSuccess = () => {
    if (!soundEffectsEnabled) return
    const ctx = initAudio()
    if (!ctx) return
    
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    
    const now = ctx.currentTime
    const notes = [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5 arpeggio
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.08)
      
      gainNode.gain.setValueAtTime(0.0, now + i * 0.08)
      gainNode.gain.linearRampToValueAtTime(0.4, now + i * 0.08 + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.3)
      
      osc.connect(gainNode)
      gainNode.connect(masterGainRef.current || ctx.destination)
      
      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.3)
    })
  }

  const playError = () => {
    if (!soundEffectsEnabled) return
    const ctx = initAudio()
    if (!ctx) return
    
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = 'sawtooth'
    osc2.type = 'sine'
    osc.frequency.setValueAtTime(120, now)
    osc2.frequency.setValueAtTime(118, now) // detune slightly
    
    gainNode.gain.setValueAtTime(0.5, now)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25)
    
    osc.connect(gainNode)
    osc2.connect(gainNode)
    gainNode.connect(masterGainRef.current || ctx.destination)
    
    osc.start()
    osc2.start()
    osc.stop(now + 0.25)
    osc2.stop(now + 0.25)
  }

  // Prime the AudioContext on any user interaction to bypass browser autoplay blocks
  useEffect(() => {
    const handleInteraction = () => {
      const ctx = ctxRef.current
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume().catch((err) => console.error('Failed to resume AudioContext:', err))
        }
      } else {
        initAudio()
      }
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  // Attach global window listeners for clicks to trigger micro sounds
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        playClick()
      }
    }
    
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
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
