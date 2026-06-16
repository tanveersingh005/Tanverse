import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowUpRight, Github } from 'lucide-react'
import { projectsData } from '../../utils/mockData'
import { useAudio } from '../../context/AudioContext'

const categories = ['All', 'Full Stack & ML', 'Frontend', 'Distributed']

export const ProjectsScroll: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { playClick } = useAudio()
  const navigate = useNavigate()

  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      
    const matchesCat =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (selectedCategory === 'Full Stack & ML' &&
        (p.category.includes('Full Stack') || p.category.includes('AI') || p.category.includes('ML')))
        
    return matchesSearch && matchesCat
  })

  const getGridClasses = (index: number, total: number) => {
    let classes = "col-span-1"
    
    // On lg screens, we use a 6-column grid where each item spans 2 columns (equates to 3 columns)
    classes += " lg:col-span-2"
    
    if (total === 8) {
      if (index === 6) classes += " lg:col-start-2"
    } else if (total === 7) {
      if (index === 6) classes += " lg:col-start-3"
    } else if (total === 5) {
      if (index === 3) classes += " lg:col-start-2"
    } else if (total === 2) {
      if (index === 0) classes += " lg:col-start-2"
    } else if (total === 1) {
      classes += " lg:col-start-3"
    }
    
    return classes
  }

  const handleSelectCat = (cat: string) => {
    playClick()
    setSelectedCategory(cat)
  }

  return (
    <section
      id="projects"
      className="relative w-full py-24 px-6 border-b border-white/5 bg-[#0a0a0c]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent-400">
              05 &bull; Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 font-display mt-2">
              Featured Projects
            </h2>
            <div className="h-0.5 w-12 bg-accent-500 mt-4 mx-auto md:mx-0 rounded-full" />
          </div>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-60 flex items-center bg-slate-950/40 border border-white/5 rounded-xl px-3 py-2 text-xs">
              <Search className="text-slate-500 mr-2" size={14} />
              <input
                type="text"
                placeholder="Query technology or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-slate-200 outline-none border-none placeholder-slate-600 focus:ring-0"
              />
            </div>
            
            {/* Quick stats counter */}
            {/* <span className="text-[10px] text-slate-500 font-matrix hidden sm:inline uppercase">
              {filteredProjects.length} SOLUTIONS RETRIEVED
            </span> */}
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelectCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-display transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-accent-600 text-white shadow-md shadow-accent-600/20'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  playClick()
                  navigate(`/projects/${project.id}`)
                }}
                className={`group relative flex flex-col bg-slate-950/20 glassmorphism rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15 cursor-pointer ${getGridClasses(index, filteredProjects.length)}`}
                data-cursor="CASE"
              >
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded bg-slate-950/70 border border-white/10 text-3xs font-bold font-display uppercase tracking-widest text-accent-400">
                    {project.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-100 font-display group-hover:text-accent-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Highlights (Metrics) */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 text-center bg-slate-950/20 rounded-lg">
                    {project.metrics.slice(0, 3).map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-xs font-black text-accent-400 font-display">{metric.value}</div>
                        <div className="text-[8px] text-slate-500 uppercase font-matrix mt-0.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation()
                        playClick()
                      }}
                      className="p-1.5 rounded-full bg-slate-950/60 border border-white/5 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer relative z-10"
                      title="Explore Source Code"
                      data-cursor="GITHUB"
                    >
                      <Github size={14} />
                    </a>

                    <Link
                      to={`/projects/${project.id}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        playClick()
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-300 font-display tracking-wide group/link cursor-pointer relative z-10"
                      data-cursor="CASE"
                    >
                      Case Study
                      <ArrowUpRight size={14} className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500 font-display">
              No matching software solutions resolved.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default ProjectsScroll
