import React, { useState } from 'react'
import { useAudio } from '../../context/AudioContext'
import { useTheme } from '../../context/ThemeContext'
import { 
  Code2, 
  Layers, 
  Wrench, 
  Sparkles, 
  GraduationCap,
  Gauge
} from 'lucide-react'

interface SkillItem {
  name: string
  level: string
  percentage: number
  desc: string
  color: string
}

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  average: number
  accentColor: string
  skills: SkillItem[]
}

function CircularProgress({ percentage, color, size = 32 }: { percentage: number; color: string; size?: number }) {
  const radius = 12
  const strokeWidth = 2.5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className="transform -rotate-90">
      <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
      <circle 
        cx="18" 
        cy="18" 
        r={radius} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeDasharray={circumference} 
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
        style={{
          filter: `drop-shadow(0 0 3px ${color})`
        }}
      />
    </svg>
  )
}

export const GalaxyOrbitSkills: React.FC = () => {
  const { playSuccess } = useAudio()
  const { resolvedTheme: _resolvedTheme } = useTheme()
  const [activeCategory, setActiveCategory] = useState<string>('languages')


  const skillCategories: SkillCategory[] = [
    {
      id: 'languages',
      name: 'Programming Languages',
      icon: <Code2 size={20} />,
      description: 'Foundational syntax engines, scripting dialects, and query protocols.',
      average: 79,
      accentColor: '#38bdf8', // Cyan accent
      skills: [
        { name: 'Python', level: 'Expert', percentage: 83, desc: 'Exploratory data pipelines, numerical computation (NumPy/Pandas), and deep learning modeling (TensorFlow).', color: '#3776AB' },
        { name: 'JavaScript', level: 'Expert', percentage: 92, desc: 'Interactive DOM behaviors, asynchronous event flows, React hooks ecosystem, and modern ES6 scripting.', color: '#F7DF1E' },
        { name: 'SQL', level: 'Expert', percentage: 95, desc: 'Structuring complex queries, schema design, relational algebra, and database indexing strategies.', color: '#0064a5' },
        { name: 'C/C++', level: 'Advanced', percentage: 80, desc: 'Object-oriented software building, complex algorithms, memory constraints, and high-performance compilation.', color: '#00599C' },
        { name: 'GraphQL', level: 'Advanced', percentage: 82, desc: 'Creating custom type definitions, writing queries, and optimizing nested API payloads.', color: '#E10098' },
        { name: 'Java', level: 'Advanced', percentage: 60, desc: 'Robust backend system architecture, design patterns, OOP principles, and server runtime environments.', color: '#007396' },
        { name: 'HTML/CSS', level: 'Expert', percentage: 90, desc: 'Crafting semantic markup structures, modern flexbox/grid alignments, responsive layouts, and animations.', color: '#E34F26' }
      ]
    },
    {
      id: 'frameworks',
      name: 'Frameworks & Libraries',
      icon: <Layers size={20} />,
      description: 'Modern application builders, UI frameworks, and data processing engines.',
      average: 88,
      accentColor: '#a855f7', // Purple accent
      skills: [
        { name: 'React.js', level: 'Expert', percentage: 94, desc: 'Building reusable component trees, state stores (Zustand), virtual DOM optimizations, and page routers.', color: '#61DAFB' },
        { name: 'Tailwind CSS', level: 'Expert', percentage: 95, desc: 'CSS-first page design, utility custom class compilation, responsive modifiers, and layout frameworks.', color: '#38BDF8' },
        { name: 'Pandas', level: 'Expert', percentage: 90, desc: 'Aggregating large datasets, cleaning null records, merging tables, and compiling analytics.', color: '#150458' },
        { name: 'NumPy', level: 'Expert', percentage: 90, desc: 'Multi-dimensional array mathematics, matrix transformations, and vectorized numeric routines.', color: '#013243' },
        { name: 'Node.js', level: 'Expert', percentage: 90, desc: 'Server-side environment configuration, event loops, clustering processes, and filesystem queries.', color: '#68A063' },
        { name: 'Express', level: 'Expert', percentage: 80, desc: 'Designing high-performance HTTP REST APIs, routing pipelines, and custom security middlewares.', color: '#7986cb' },
        { name: 'Bootstrap', level: 'Advanced', percentage: 95, desc: 'Structuring responsive grid rows, standard visual templates, and styling rapid prototypes.', color: '#7952B3' },
        { name: 'TensorFlow', level: 'Advanced', percentage: 70, desc: 'Training deep learning classifiers, compiling neural networks, and deploying models to staging.', color: '#FF6F00' }
      ]
    },
    {
      id: 'tools',
      name: 'Development Tools & DBs',
      icon: <Wrench size={20} />,
      description: 'Container runtimes, testing platforms, databases, and editor sandboxes.',
      average: 89,
      accentColor: '#ec4899', // Pink accent
      skills: [
        { name: 'PostgreSQL', level: 'Expert', percentage: 80, desc: 'Enterprise relational database design, query optimization, joins, constraints, and data integrity.', color: '#336791' },
        { name: 'MySQL', level: 'Expert', percentage: 95, desc: 'Configuring relational schemas, transaction queries, and maintaining data tables.', color: '#00758F' },
        { name: 'MongoDB', level: 'Expert', percentage: 80, desc: 'Non-relational document data structures, collection queries, indexes, and aggregation loops.', color: '#47A248' },
        { name: 'Git & GitHub', level: 'Expert', percentage: 92, desc: 'Managing branches, handling merge conflicts, collaborative issues tracking, and version histories.', color: '#F05032' },
        { name: 'VS Code', level: 'Expert', percentage: 95, desc: 'Highly optimized development editor setup with debuggers, extensions, and syntax triggers.', color: '#007ACC' },
        { name: 'Postman', level: 'Expert', percentage: 88, desc: 'Simulating HTTP calls, testing API headers, building testing suites, and documenting endpoints.', color: '#FF6C37' },
        { name: 'PowerBI', level: 'Advanced', percentage: 90, desc: 'Formulating interactive dashboards, DAX queries, data modeling, and custom reports.', color: '#F2C811' },
        { name: 'Docker', level: 'Advanced', percentage: 20, desc: 'Containerizing services, drafting multi-stage Dockerfiles, network configs, and volumes.', color: '#2496ED' }
      ]
    },
    {
      id: 'design',
      name: 'Design & AI Systems',
      icon: <Sparkles size={20} />,
      description: 'Generative AI prompt workflows, visual interface layouts, and asset builders.',
      average: 87,
      accentColor: '#10b981', // Green accent
      skills: [
        { name: 'Claude', level: 'Expert', percentage: 90, desc: 'Leveraging model context windows to debug modules, synthesize logic, and write reviews.', color: '#D97706' },
        { name: 'Prompt Eng.', level: 'Expert', percentage: 95, desc: 'Creating custom system roles, multi-shot instructions, and parsing raw outputs.', color: '#10A37F' },
        { name: 'Figma', level: 'Expert', percentage: 95, desc: 'Creating vector prototypes, visual wireframes, component design systems, and developer handoffs.', color: '#F24E1E' },
        { name: 'Canva', level: 'Expert', percentage: 99, desc: 'Formulating quick layouts, social graphic visual assets, presentation slides, and visuals.', color: '#00C4CC' },
        { name: 'Agentic AI', level: 'Advanced', percentage: 70, desc: 'Building automated tools loop systems, autonomous action cycles, and agent frameworks.', color: '#8B5CF6' },
        { name: 'Photoshop', level: 'Advanced', percentage: 85, desc: 'Visual Graphics raster manipulation, photo color-grading, asset exporting, and layouts.', color: '#31A8FF' },
        { name: 'Google Stitch', level: 'Advanced', percentage: 89, desc: 'Orchestrating workflows, visual pipelines, and cloud platform integrations.', color: '#4285F4' }
      ]
    },
    {
      id: 'coursework',
      name: 'Academic Coursework',
      icon: <GraduationCap size={20} />,
      description: 'Computer Science theories, computing architecture, and software principles.',
      average: 89,
      accentColor: '#f59e0b', // Amber accent
      skills: [
        { name: 'DSA', level: 'Expert', percentage: 80, desc: 'Designing memory-efficient data wrappers: graphs, trees, hashes, lists, and queues.', color: '#EC4899' },
        { name: 'OOPs', level: 'Expert', percentage: 75, desc: 'Structuring systems around encapsulation, inheritance, polymorphism, and abstraction.', color: '#10B981' },
        { name: 'Algorithms', level: 'Expert', percentage: 75, desc: 'Formulating sorting, searching, traversing, and dynamic programming logics.', color: '#F59E0B' },
        { name: 'DBMS', level: 'Expert', percentage: 95, desc: 'Relational database theories, transactions, ACID parameters, and normalizations.', color: '#3B82F6' },
        { name: 'Software Eng.', level: 'Expert', percentage: 90, desc: 'Agile sprints, code compliance, documentation reviews, testing coverage, and staging deployments.', color: '#6366F1' },
        { name: 'Operating Sys.', level: 'Advanced', percentage: 85, desc: 'Managing thread states, CPU scheduling routines, virtual memories, and lock concurrency.', color: '#14B8A6' },
        { name: 'System Design', level: 'Advanced', percentage: 70, desc: 'Architecting scaling microservices, load balancing, caching nodes, and sharding databases.', color: '#8B5CF6' }
      ]
    }
  ]

  const activeCategoryData = skillCategories.find((cat) => cat.id === activeCategory) || skillCategories[0]

  const handleCategorySelect = (catId: string) => {
    playSuccess()
    setActiveCategory(catId)
  }


  // Interactive mouse tracking spotlight reflection on card elements
  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--spotlight-x', `${x}px`)
    card.style.setProperty('--spotlight-y', `${y}px`)
  }

  return (
    <section
      id="skills"
      className="relative w-full py-28 px-6 border-b border-white/5 bg-[#0a0a0c] overflow-hidden"
    >
      {/* Background neon elements */}
      <div className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-accent-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Cyberpunk dot background grid */}
      <div className="absolute inset-0 grid-dots opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 pb-8 border-b border-white/5">
          <div className="text-left">
            <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent-400">
              03 &bull; StrongHold
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 font-display mt-2">
              Technical Core Stack
            </h2>
            <div className="h-0.5 w-12 bg-accent-500 mt-4 rounded-full" />
          </div>
        </div>

        {/* Split Split Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* LEFT COLUMN: Holographic Vertical Deck (1/3 width) */}
          <div className="lg:col-span-4 flex flex-col gap-4.5">
            <span className="text-[9px] font-bold font-display uppercase tracking-widest text-slate-500 pl-2 text-left">
              Select Core Module
            </span>

            {/* Desktop vertical stack, Mobile horizontal swipe deck */}
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible scrollbar-none pb-4 lg:pb-0 select-none">
              {skillCategories.map((category) => {
                const isActive = category.id === activeCategory
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    onMouseMove={handleSpotlightMove}
                    className={`flex-shrink-0 w-[240px] lg:w-full p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between relative overflow-hidden group ${
                      isActive 
                        ? 'bg-slate-950/40 border-accent-500/50 shadow-[0_8px_30px_rgba(168,85,247,0.12)] translate-x-0 lg:translate-x-3' 
                        : 'bg-slate-950/15 border-white/5 hover:border-white/12 hover:bg-slate-950/25 hover:translate-x-0 lg:hover:translate-x-1.5'
                    }`}
                    style={{
                      '--glow-color': `${category.accentColor}22`
                    } as React.CSSProperties}
                  >
                    {/* Custom mouse spotlight highlight behind card */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 80px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--glow-color), transparent 80%)`
                      }}
                    />

                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isActive ? 'bg-accent-600/10 border-accent-500/20 text-accent-400' : 'bg-slate-950/60 border-white/5 text-slate-400'
                      }`}>
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <h3 className={`text-xs md:text-sm font-extrabold font-display transition-colors ${
                          isActive ? 'text-slate-100' : 'text-slate-400'
                        }`}>
                          {category.name}
                        </h3>
                        <span className="text-[8px] font-bold text-slate-500 font-matrix uppercase tracking-wider block mt-0.5">
                          {category.skills.length} parameters
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10">
                      <CircularProgress percentage={category.average} color={category.accentColor} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Expansive Diagnostic Dashboard (2/3 width) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* The main active category metrics dashboard card */}
            <div className="flex-1 bg-slate-950/20 glassmorphism rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[8.5px] font-bold text-slate-500 font-matrix uppercase tracking-wider">
                <Gauge size={10} className="text-accent-400" />
                <span>ACTIVE MODULE INTERACTIVE RUNTIME</span>
              </div>

              {/* Category Info */}
              <div className="text-left mb-8">
                <span className="text-[8px] font-bold font-matrix text-accent-400 uppercase tracking-widest">
                  Active Mainframe Category:
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-100 font-display mt-0.5 uppercase tracking-wide">
                  {activeCategoryData.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                  {activeCategoryData.description}
                </p>
              </div>

              {/* Skills Interactive Staggered Grid */}
              {/* Every time activeCategory changes, the key resets triggering the slideUpFade animation */}
              <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full flex-1 align-content-start">
                {activeCategoryData.skills.map((skill, idx) => {
                  return (
                    <div
                      key={skill.name}
                      onMouseMove={handleSpotlightMove}
                      className="p-5 rounded-2xl border bg-slate-950/35 border-white/5 hover:border-accent-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex flex-col gap-3 transition-all duration-300 cursor-pointer text-left relative overflow-hidden group animate-slide-up-fade opacity-0"
                      style={{
                        animationDelay: `${idx * 45}ms`,
                        '--spotlight-glow': `${activeCategoryData.accentColor}15`
                      } as React.CSSProperties}
                    >
                      {/* Mouse tracking radial spotlight */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle 80px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-glow), transparent 80%)`
                        }}
                      />

                      {/* Item Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/5 relative z-10">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                            style={{
                              backgroundColor: activeCategoryData.accentColor
                            }}
                          />
                          <span className="text-2xs font-extrabold text-slate-100 font-display tracking-wide uppercase leading-none">
                            {skill.name}
                          </span>
                        </div>
                        <span 
                          className="text-[8px] font-bold font-matrix uppercase tracking-widest px-1.5 py-0.5 rounded border leading-none"
                          style={{
                            color: activeCategoryData.accentColor,
                            borderColor: `${activeCategoryData.accentColor}25`,
                            backgroundColor: `${activeCategoryData.accentColor}0a`
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Ruler-Style Hardware Progress Slider */}
                      <div className="flex flex-col gap-1 mt-1.5 relative z-10">
                        {/* Division labels */}
                        <div className="flex justify-between items-center text-[7px] text-slate-600 font-matrix">
                          <span>0%</span>
                          <span>25%</span>
                          <span>50%</span>
                          <span>75%</span>
                          <span>100%</span>
                        </div>
                        {/* Track slider */}
                        <div className="w-full h-1.5 bg-slate-900/60 rounded-full border border-white/5 relative shadow-inner">
                          {/* Inner ticks lines inside slider */}
                          <div className="absolute inset-0 flex justify-between px-[25%] pointer-events-none">
                            <span className="w-px h-full bg-white/5" />
                            <span className="w-px h-full bg-white/5" />
                            <span className="w-px h-full bg-white/5" />
                          </div>
                          {/* Fills progress */}
                          <div 
                            className="h-full rounded-full transition-all duration-1000 relative"
                            style={{
                              width: `${skill.percentage}%`,
                              backgroundColor: activeCategoryData.accentColor
                            }}
                          >
                            {/* Simple non-glowing knob slider handle */}
                            <span 
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white bg-slate-950 cursor-pointer transform translate-x-1.5 scale-90 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
export default GalaxyOrbitSkills
