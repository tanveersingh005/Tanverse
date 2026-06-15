import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { useAudio } from '../../context/AudioContext'

export const MusicPlayer: React.FC = () => {
  const soundEffectsEnabled = usePortfolioStore((state) => state.soundEffectsEnabled)
  const setSoundEffectsEnabled = usePortfolioStore((state) => state.setSoundEffectsEnabled)
  const { playClick } = useAudio()

  const handleToggleFX = () => {
    playClick()
    setSoundEffectsEnabled(!soundEffectsEnabled)
  }

  return (
    <button
      onClick={handleToggleFX}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border focus:outline-none cursor-pointer ${
        soundEffectsEnabled 
          ? 'bg-slate-900/60 dark:bg-slate-900/60 border-white/10 text-accent-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-accent-500/30' 
          : 'bg-white/80 dark:bg-slate-950/20 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-400/50'
      }`}
      title={soundEffectsEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
      data-cursor="CLICK"
    >
      {soundEffectsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
export default MusicPlayer
