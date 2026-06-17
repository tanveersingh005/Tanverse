import React, { useState, useEffect, useLayoutEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AudioProvider, useAudio } from './context/AudioContext'
import { usePortfolioStore } from './store/usePortfolioStore'
import { useLenis } from './hooks/useLenis'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

// Components
import { Navbar } from './components/common/Navbar'
import { CustomCursor } from './components/common/CustomCursor'
import { LoadingScreen } from './components/common/LoadingScreen'
import { CommandPalette } from './components/common/CommandPalette'

// Features sections (Single page portals)
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { ExperienceTimeline } from './features/experience/ExperienceTimeline'
import { GalaxyOrbitSkills } from './features/skills/GalaxyOrbitSkills'
import { AchievementsSection } from './features/achievements/AchievementsSection'
import { ProjectsScroll } from './features/projects/ProjectsScroll'
import { LeadershipCerts } from './features/leadership-certs/LeadershipCerts'
import { ResumeView } from './features/resume/ResumeView'
import { ContactForm } from './features/contact/ContactForm'

// Deep link views
import { ProjectDetails } from './features/projects/ProjectDetails'


// Analytics and keyboard event listener shell
const AppAnalyticsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const trackPageView = usePortfolioStore((state) => state.trackPageView)
  const trackClick = usePortfolioStore((state) => state.trackClick)
  const trackKeyPress = usePortfolioStore((state) => state.trackKeyPress)

  // Track page navigation views
  useEffect(() => {
    let page = location.pathname
    if (page === '/') page = 'loader'
    else if (page === '/home') page = 'home'
    else if (page.startsWith('/projects/')) page = 'project-details'
    else if (page.startsWith('/blog/')) page = 'blog-post'
    
    trackPageView(page)
  }, [location.pathname, trackPageView])

  // Track click & keyboard inputs for dashboard analytics
  useEffect(() => {
    const handleGlobalClick = () => trackClick()
    const handleGlobalKeyPress = () => trackKeyPress()

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('keydown', handleGlobalKeyPress)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('keydown', handleGlobalKeyPress)
    }
  }, [trackClick, trackKeyPress])

  return <>{children}</>
}

// 404 Custom retro screen with game/retro return home panel
const NotFoundView: React.FC = () => {
  const { playError } = useAudio()
  
  useEffect(() => {
    playError()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07070a] font-display text-center p-6 text-[#ff0055]">
      <div className="absolute inset-0 grid-dots opacity-20" />
      
      <div className="relative z-10 glassmorphism p-8 md:p-12 rounded-3xl border border-[#ff0055]/20 max-w-md shadow-[0_0_30px_rgba(255,0,85,0.05)]">
        <h1 className="text-7xl font-extrabold tracking-tighter">404</h1>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mt-2 mb-4 font-matrix">
          SEGMENT FAULT: ADDRESS RESOLUTION ERROR
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          The requested coordinate memory is either unallocated or has been swept by garbage collections loops.
        </p>
        <Link
          to="/home"
          className="inline-flex px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-red-600/10"
        >
          Return to Portal
        </Link>
      </div>
    </div>
  )
}

// Unified homepage layout containing sections
const MainPortalView: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const [uptime, setUptime] = useState(0)

  // Local India Standard Time formatted output (GMT+5:30)
  const getISTTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }
  const [istTime, setIstTime] = useState(() => getISTTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setIstTime(getISTTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatUptime = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${h > 0 ? `${h}h ` : ''}${m > 0 || h > 0 ? `${m}m ` : ''}${s}s`
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <GalaxyOrbitSkills />
      <AchievementsSection />
      <ProjectsScroll />
      <LeadershipCerts />
      <ResumeView />
      <ContactForm />
      
      {/* Enhanced Footer */}
      <footer className="w-full bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-10 relative overflow-hidden select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 grid-dots opacity-[0.03] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Main columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 mb-8 border-b border-[var(--border-color)]">
            
            {/* Column 1: Branding & Socials */}
            <div className="md:col-span-4 flex flex-col gap-4 text-left">
              <div 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none group w-fit"
                data-cursor="HOME"
              >
                <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_6px_rgba(168,85,247,0.15)]">
                    <defs>
                      <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent-300, #a855f7)" />
                        <stop offset="100%" stopColor="var(--accent-600, #6366f1)" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#footerLogoGrad)" strokeWidth="3" opacity="0.3" strokeDasharray="10 5" />
                    {/* Rotating orbit ring */}
                    <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="url(#footerLogoGrad)" strokeWidth="2.5" className="footer-logo-orbit" opacity="0.8" />
                    <circle cx="50" cy="50" r="24" fill="var(--bg-secondary)" stroke="url(#footerLogoGrad)" strokeWidth="3" />
                    <path d="M38 40 H62 M50 40 V64 M44 64 H56" fill="none" stroke="url(#footerLogoGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-display font-bold text-base tracking-wider text-[var(--text-primary)] group-hover:text-accent-500 transition-colors">
                  Tanverse
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans mt-1 max-w-sm">
                A professional portfolio showcasing premium full-stack products, algorithmic frameworks, data science models, and developer engineering.
              </p>
              
              {/* Social links row */}
              <div className="flex gap-3 mt-2">
                {[
                  { icon: <Github size={15} />, href: 'https://github.com/tanveersingh005', label: 'GitHub' },
                  { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/tanveer-singh005', label: 'LinkedIn' },
                  { icon: <Mail size={15} />, href: 'mailto:tanveercloud005@gmail.com', label: 'Email' }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-accent-500 border border-[var(--border-color)] hover:border-accent-500/30 bg-slate-950/5 dark:bg-slate-950/40 p-2 rounded-xl transition-all cursor-pointer hover:-translate-y-0.5"
                    title={item.label}
                    data-cursor="LINK"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: System Directory */}
            <div className="md:col-span-3 flex flex-col gap-4 text-left">
              <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-500">
                System Directory
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                {[
                  { id: 'home', label: 'Start Journey' },
                  { id: 'about', label: 'About Me' },
                  { id: 'projects', label: 'Featured Work' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'skills', label: 'Core Skills' },
                  { id: 'achievements', label: 'Milestones' },
                  { id: 'resume', label: 'Resume' },
                  { id: 'contact', label: 'Get in Touch' }
                ].map((link) => (
                  <a
                    key={link.id}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-[var(--text-secondary)] hover:text-accent-500 transition-all cursor-pointer w-fit hover:translate-x-1 duration-200"
                    data-cursor="NAV"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Tech Stack Badges */}
            <div className="md:col-span-2 flex flex-col gap-4 text-left">
              <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-500">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 max-w-xs">
                {[
                  'React 19',
                  'TypeScript',
                  'Vite',
                  'Tailwind CSS',
                  'Three.js',
                  'Framer Motion',
                  'Lenis Scroll'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-medium font-matrix px-2 py-1 rounded bg-slate-950/5 dark:bg-white/5 border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-accent-500/20 hover:text-accent-500 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4: Operational Telemetry */}
            <div className="md:col-span-3 flex flex-col gap-4 text-left">
              <h4 className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-500">
                Operational Telemetry
              </h4>
              <div className="flex flex-col gap-2 text-[10px] font-matrix text-slate-500 uppercase tracking-widest">
                <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                  <span>ENVIRONMENT</span>
                  <span className="text-[var(--text-primary)] font-bold">PRODUCTION</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                  <span>DIAGNOSTICS</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> STABLE
                  </span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                  <span>ACTIVE THEME</span>
                  <span className="text-accent-500 font-bold">{resolvedTheme}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                  <span>DELHI, IN (IST)</span>
                  <span className="text-[var(--text-primary)] font-bold">{istTime}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>SESSION UPTIME</span>
                  <span className="text-[var(--text-primary)] font-bold">{formatUptime(uptime)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-matrix uppercase tracking-wider">
            <div className="flex flex-wrap items-center gap-2">
              <span>TANVERSE SYSTEMS &bull; DESIGN COMPLIANCE &copy; 2026</span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <div className="flex gap-3 text-slate-400 font-sans normal-case text-[10px]">
                <a href="#sitemap.xml" className="hover:text-accent-500 transition-colors">Sitemap</a>
                <a href="#robots.txt" className="hover:text-accent-500 transition-colors">Robots</a>
              </div>
            </div>

            {/* Scroll back to top button */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-accent-500/30 bg-slate-950/5 dark:bg-slate-950/40 text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer hover:-translate-y-0.5"
              data-cursor="UP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={10} className="transform group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </footer>
    </div>
  )
}

const AppContent: React.FC = () => {
  useLenis() // Smooth scrolling activation
  const location = useLocation()
  const navigate = useNavigate()
  const fromProject = (location.state as { fromProject?: boolean })?.fromProject

  const isLoaderRoute = location.pathname === '/'

  const [targetSection, setTargetSection] = useState<string | null>(null)
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection)

  const resetToHeroTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const handleComplete = (target?: string) => {
    const nextTarget = target || 'home'
    sessionStorage.setItem('portfolio_loaded', 'true')
    navigate('/home') // navigate to portal homepage
    setTargetSection(nextTarget)
  }

  // Redirect to loader on first session visit if visiting deep paths directly
  // Also ensure loader is in the history stack if bypassing the loader
  useEffect(() => {
    const isLoaded = sessionStorage.getItem('portfolio_loaded') === 'true'
    const loaderInHistory = sessionStorage.getItem('loader_in_history') === 'true'

    if (!isLoaded && location.pathname !== '/') {
      navigate('/', { replace: true })
    } else if (isLoaded && location.pathname !== '/' && !loaderInHistory) {
      sessionStorage.setItem('loader_in_history', 'true')
      const currentPath = location.pathname
      const currentState = location.state
      navigate('/', { replace: true })
      navigate(currentPath, { replace: false, state: currentState })
    } else if (location.pathname === '/') {
      sessionStorage.setItem('loader_in_history', 'true')
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const isLoaded = sessionStorage.getItem('portfolio_loaded') === 'true'
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = isLoaded ? 'auto' : 'manual'
    }
  }, [])

  // Scroll to projects section if returning programmatically from project details
  useEffect(() => {
    if (location.pathname === '/home' && fromProject) {
      // Clear location state so refreshes don't scroll again
      window.history.replaceState({}, document.title)
      
      const timer = setTimeout(() => {
        const el = document.getElementById('projects')
        if (el) {
          el.scrollIntoView({ behavior: 'auto' })
        }
        setActiveSection('projects')
      }, 100)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [location.pathname, fromProject, setActiveSection])

  // IntersectionObserver Scroll-Spy to automatically highlight active navbar tab on scroll and on load
  useEffect(() => {
    if (location.pathname !== '/home') return

    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'achievements', 'resume', 'contact']
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // active when the section occupies the central field of the screen
      threshold: 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Give DOM a split second to render and Lenis scroll to settle
    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
        }
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [location.pathname, setActiveSection])

  useLayoutEffect(() => {
    if (location.pathname !== '/home' || targetSection !== 'home') return
    if (fromProject) return // Skip resetting to hero top if coming back from project details

    setActiveSection('home')
    resetToHeroTop()

    let secondFrame: number | null = null
    const firstFrame = window.requestAnimationFrame(() => {
      resetToHeroTop()

      secondFrame = window.requestAnimationFrame(() => {
        resetToHeroTop()
        setTargetSection(null)
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame)
      }
    }
  }, [location.pathname, targetSection, setActiveSection, fromProject])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (location.pathname === '/home' && targetSection && targetSection !== 'home') {
      timer = setTimeout(() => {
        const el = document.getElementById(targetSection)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
        setActiveSection(targetSection)
        setTargetSection(null)
      }, 150)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [location.pathname, targetSection, setActiveSection])

  if (isLoaderRoute) {
    return <LoadingScreen onComplete={handleComplete} />
  }

  return (
    <>
      {/* Layout items */}
      <CustomCursor />
      <Navbar />
      <CommandPalette />

      {/* Routes portal maps */}
      <Routes>
        <Route path="/home" element={<MainPortalView />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
          <AppAnalyticsWrapper>
            <AppContent />
          </AppAnalyticsWrapper>
        </Router>
      </AudioProvider>
    </ThemeProvider>
  )
}
export default App
