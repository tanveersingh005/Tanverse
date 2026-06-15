import React, { useState, useEffect } from 'react'
import { Menu, X, Command } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { MusicPlayer } from './MusicPlayer'
import { ThemeToggle } from './ThemeToggle'
import { useAudio } from '../../context/AudioContext'

const navItems = [
  { id: 'home', label: 'Start Journey' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume' }
]

export const Navbar: React.FC = () => {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection)
  
  const setCommandPaletteOpen = usePortfolioStore((state) => state.setCommandPaletteOpen)
  const { playClick } = useAudio()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scrolling to add glass effect shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    playClick()
    setActiveSection(sectionId)
    setMobileMenuOpen(false)

    // Smooth scroll to element
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between lg:gap-4 xl:gap-10 2xl:gap-20">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer select-none group"
          data-cursor="HOME"
        >
          <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-300, #06b6d4)" />
                  <stop offset="100%" stopColor="var(--accent-600, #3b82f6)" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#logoGrad)" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
              <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="url(#logoGrad)" strokeWidth="2.5" transform="rotate(-30 50 50)" opacity="0.8" />
              <circle cx="50" cy="50" r="26" fill="rgba(9, 9, 11, 0.95)" stroke="url(#logoGrad)" strokeWidth="3.5" />
              <path d="M36 38 H64 M50 38 V66 M42 66 H58" fill="none" stroke="url(#logoGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-wider text-slate-100 group-hover:text-accent-300 transition-colors">
            Tanverse
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-3.5 2xl:gap-6 bg-slate-900/35 border border-white/5 rounded-full p-1.5 glassmorphism">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-2.5 py-1.5 xl:px-4 xl:py-2 2xl:px-5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'text-white bg-accent-600 dark:bg-accent-600/30 border border-accent-500/25 shadow-sm shadow-accent-600/10 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                data-cursor="NAV"
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Utilities */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-10">
          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Music player controls */}
          <MusicPlayer />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-6 lg:hidden">
          <ThemeToggle />
          <MusicPlayer />

          <button
            onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-white/5 rounded-md cursor-pointer"
            data-cursor="MENU"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glassmorphism border-b border-white/5 py-6 px-6 shadow-2xl flex flex-col gap-3 animate-fade-in bg-[#0c0c10]/95">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 px-4 rounded-lg text-left text-sm font-semibold transition-all ${
                  isActive 
                    ? 'text-accent-600 dark:text-white bg-accent-600/10 dark:bg-accent-600/20 border-l-2 border-accent-500' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            )
          })}
          
          <div className="border-t border-white/5 pt-4 mt-2">
            <button
              onClick={() => { playClick(); setMobileMenuOpen(false); setCommandPaletteOpen(true); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/5 text-xs text-slate-300 font-semibold"
            >
              <Command size={14} /> Command Menu
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
