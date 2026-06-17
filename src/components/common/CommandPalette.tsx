import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, ArrowDown, ArrowUp, CornerDownLeft, Navigation, Laptop, FileText } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { useTheme } from '../../context/ThemeContext'
import { useAudio } from '../../context/AudioContext'

interface PaletteItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Design Studio' | 'Shortcuts & System'
  icon: React.ReactNode
  action: () => void
}

export const CommandPalette: React.FC = () => {
  const open = usePortfolioStore((state) => state.commandPaletteOpen)
  const setOpen = usePortfolioStore((state) => state.setCommandPaletteOpen)
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection)
  
  const customCursor = usePortfolioStore((state) => state.customCursorEnabled)
  const setCustomCursor = usePortfolioStore((state) => state.setCustomCursorEnabled)
  


  const { setTheme } = useTheme()
  const { playClick, playSuccess } = useAudio()

  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Define commands palette list
  const getCommands = (): PaletteItem[] => [
    // Navigation
    {
      id: 'nav-home',
      title: 'Navigate: Home',
      subtitle: 'Jump back to the main portal header',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('home')
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-about',
      title: 'Navigate: About Me',
      subtitle: 'Read personal bio and background history',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('about')
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-experience',
      title: 'Navigate: Experience Timeline',
      subtitle: 'Expand career, roles, and project files',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('experience')
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-skills',
      title: 'Navigate: Skills Galaxy',
      subtitle: 'Spin the orbit graph of technological profiles',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('skills')
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-projects',
      title: 'Navigate: Apple-style Projects Scroll',
      subtitle: 'Investigate metrics, codebases, and systems',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('projects')
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }
    },


    {
      id: 'nav-achievements',
      title: 'Navigate: Achievements Milestones',
      subtitle: 'Browse awards, hackathons, and open source contributions',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('achievements')
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-contact',
      title: 'Navigate: Contact Node',
      subtitle: 'Reach out to establish professional connections',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('contact')
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: 'nav-resume',
      title: 'Navigate: Curriculum Vitae (Resume)',
      subtitle: 'View academic background and credentials',
      category: 'Navigation',
      icon: <Navigation size={15} />,
      action: () => {
        setActiveSection('resume')
        document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    // Shortcuts
    {
      id: 'theme-dark',
      title: 'Action: Switch to Dark Theme',
      subtitle: 'Apply deep charcoal navy and warm off-white styling',
      category: 'Shortcuts & System',
      icon: <Laptop size={15} />,
      action: () => setTheme('dark')
    },
    {
      id: 'theme-light',
      title: 'Action: Switch to Light Theme',
      subtitle: 'Apply warm ivory and milk-glass editorial styling',
      category: 'Shortcuts & System',
      icon: <Laptop size={15} />,
      action: () => setTheme('light')
    },
    {
      id: 'cursor-toggle',
      title: `Toggle: Custom Interactive Cursor`,
      subtitle: `Currently: ${customCursor ? 'Active' : 'Disabled'}`,
      category: 'Shortcuts & System',
      icon: <Laptop size={15} />,
      action: () => setCustomCursor(!customCursor)
    },

    {
      id: 'download-resume',
      title: 'Action: Download Resume (PDF)',
      subtitle: 'Save a copy of compiled engineer files',
      category: 'Shortcuts & System',
      icon: <FileText size={15} />,
      action: () => {
        const link = document.createElement('a')
        link.href = '/Resume_Tanveer_Singh.pdf'
        link.download = 'Tanveer_Singh_Resume.pdf'
        link.click()
        playSuccess()
      }
    }
  ]

  // Filter commands
  const filteredCommands = getCommands().filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  )

  // Auto focus input
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150)
      setSelectedIndex(0)
      setSearch('')
    }
  }, [open])

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playClick()
        setOpen(!open)
        return
      }

      if (!open) return

      if (e.key === 'Escape') {
        e.preventDefault()
        playClick()
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        playClick()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playClick()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          setOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, selectedIndex, filteredCommands, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => { playClick(); setOpen(false); }}
            className="fixed inset-0 z-[9995] bg-[#050508]/80 backdrop-blur-md"
          />

          {/* Palette Center Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            ref={containerRef}
            className="fixed top-[15%] left-[50%] translate-x-[-50%] w-full max-w-xl z-[9996] glassmorphism rounded-xl border border-white/10 shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[480px]"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-slate-950/40">
              <Search className="text-slate-400" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Search command palette..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 border-none outline-none focus:ring-0"
              />
              <div className="flex items-center gap-1 glassmorphism px-2 py-0.5 rounded text-[10px] text-slate-500 font-matrix">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>

            {/* List Results */}
            <div className="flex-1 overflow-y-auto p-2 min-h-[150px] scrollbar-thin">
              {filteredCommands.length > 0 ? (
                // Grouping entries in rendering
                Object.entries(
                  filteredCommands.reduce((groups, item) => {
                    if (!groups[item.category]) groups[item.category] = []
                    groups[item.category].push(item)
                    return groups
                  }, {} as Record<string, PaletteItem[]>)
                ).map(([category, items]) => (
                  <div key={category} className="mb-3">
                    {/* Category Label */}
                    <div className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-500 px-3 py-1 mb-1">
                      {category}
                    </div>

                    {/* Category items */}
                    <div className="flex flex-col gap-0.5">
                      {items.map((cmd) => {
                        // Find global index in flat list for highlighting
                        const flatIndex = filteredCommands.findIndex((fc) => fc.id === cmd.id)
                        const isSelected = flatIndex === selectedIndex

                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action()
                              setOpen(false)
                            }}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-accent-600/35 text-white border-l-4 border-accent-500 pl-2 shadow-sm shadow-accent-600/10'
                                : 'text-slate-300 hover:bg-slate-900/20'
                            }`}
                            data-cursor="EXECUTE"
                          >
                            <div className={`p-1.5 rounded-md ${isSelected ? 'bg-accent-500/20 text-accent-300' : 'bg-slate-950/50 text-slate-400'}`}>
                              {cmd.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-100">{cmd.title}</div>
                              <div className="text-[10px] text-slate-400 truncate mt-0.5">{cmd.subtitle}</div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1 font-matrix text-[9px] text-accent-400">
                                <span>SELECT</span>
                                <CornerDownLeft size={8} />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <Command size={24} className="mb-2 opacity-30" />
                  <span className="text-xs font-display">No commands match your query.</span>
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="flex justify-between items-center px-4 py-2 border-t border-white/5 bg-slate-950/40 text-[10px] text-slate-500 font-matrix">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ArrowUp size={10} /><ArrowDown size={10} /> Navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft size={10} /> Select</span>
              </div>
              <span>ESC to Exit</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
