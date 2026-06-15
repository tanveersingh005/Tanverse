import React from 'react'
import { motion } from 'framer-motion'
import { Award, Briefcase, Users, ExternalLink, Film, Megaphone, GraduationCap } from 'lucide-react'
import { useAudio } from '../../context/AudioContext'

interface CertificationItem {
  title: string
  issuer: string
  desc: string
  skills: string[]
  link: string
}

interface PORItem {
  title: string
  organization: string
  period: string
  bullets: string[]
  icon: React.ReactNode
}

export const LeadershipCerts: React.FC = () => {
  const { playClick } = useAudio()

  const certifications: CertificationItem[] = [
    {
      title: 'Data Analytics Job Simulation',
      issuer: 'Quantium',
      desc: 'Executed end-to-end data preparation and customer analytics to drive actionable business insights. Developed data-driven strategies using Python to optimize retail performance and category growth.',
      skills: ['Data Preparation', 'Customer Analytics', 'Python'],
      link: 'https://www.theforage.com/completion-certificates/32A6DqtsbF7LbKdcq/NkaC7knWtjSbi6aYv_32A6DqtsbF7LbKdcq_rpkRbkz6K9Aykscug_1768832823310_completion_certificate.pdf'
    },
    {
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte Australia',
      desc: 'Applied forensic technology and data analysis to solve complex real-world business challenges. Synthesized large datasets to identify patterns and present findings for strategic decision-making.',
      skills: ['Forensic Tech', 'Data Analysis', 'Data Visualization'],
      link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_rpkRbkz6K9Aykscug_1767361994347_completion_certificate.pdf'
    },
    {
      title: 'Project Manager Job Simulation',
      issuer: 'Siemens Mobility',
      desc: 'Focused on KPI development and dashboarding to streamline progress tracking and resource management.',
      skills: ['KPI Development', 'Dashboarding', 'Resource Management'],
      link: 'https://www.theforage.com/completion-certificates/YtWaumzWHmKiqP63y/zSefEeEKvojiQqiaH_YtWaumzWHmKiqP63y_rpkRbkz6K9Aykscug_1767366066459_completion_certificate.pdf'
    },
    {
      title: 'Leetcode SQL50 Badge',
      issuer: 'Leetcode',
      desc: 'Solved top 50 SQL problems on Leetcode, demonstrating strong database querying and optimization skills.',
      skills: ['SQL', 'Database Management', 'Query Optimization'],
      link: 'https://leetcode.com/certificates/1234567890abcdef/' // Placeholder link
    }
  ]

  const leadershipRoles: PORItem[] = [
    {
      title: 'Student Placement Coordinator',
      organization: 'Tnp Cell — IIIT Kota',
      period: 'May 2026 – Present',
      bullets: [
        'Coordinating company outreach, recruiter engagement, and internship opportunities for the 2027 batch.'
      ],
      icon: <Users size={18} />
    },
    {
      title: 'Club Coordinator',
      organization: 'Neon Cinematics — IIIT Kota',
      period: 'Apr 2025 – April 2026',
      bullets: [
        'Leading creative workshops for 400+ students to improve technical filmmaking and engagement.'
      ],
      icon: <Film size={18} />
    },
    {
      title: 'Class Representative',
      organization: 'IIIT Kota',
      period: 'Aug 2024 – Present',
      bullets: [
        'Liaised between 60+ students and department faculty to streamline academic coordination, resolve administrative queries, and foster peer collaboration.'
      ],
      icon: <GraduationCap size={18} />
    },
    {
      title: 'Junior IT Executive',
      organization: 'TechKnow Society — IIIT Kota',
      period: 'Sept 2023 – Aug 2024',
      bullets: [
        'Managed technical operations for a Tech Summit with over 800 attendees, overseeing digital promotions.'
      ],
      icon: <Megaphone size={18} />
    },
    
  ]

  // Spotlight cursor movement listener
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
      id="leadership-certs"
      className="relative w-full py-24 px-6 border-b border-white/5 bg-[#0a0a0c] overflow-hidden text-left"
    >
      {/* Background spotlights */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-dots opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 text-center md:text-left"
        >
          <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent-400">
            06 &bull; Leadership & Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 font-display mt-3 leading-tight">
            Influence &
            <br />
            Certifications.
          </h2>
          <div className="h-0.5 w-12 bg-accent-500 mt-4 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Column 1: Certifications */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2 pl-2">
              <Award className="text-accent-400" size={18} />
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-400">
                Professional Certifications
              </h3>
            </div>
            
            <div className="flex flex-col gap-5">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseMove={handleSpotlightMove}
                  onClick={() => playClick()}
                  data-cursor="CLICK"
                  className="bg-slate-950/20 glassmorphism p-6 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all duration-300 relative group overflow-hidden cursor-pointer"
                  style={{
                    '--spotlight-glow': 'rgba(168, 85, 247, 0.08)'
                  } as React.CSSProperties}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle 100px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-glow), transparent 80%)'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] text-accent-400 font-bold font-matrix uppercase tracking-wider block mt-0.5">
                          {cert.issuer}
                        </span>
                      </div>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation()
                          playClick()
                        }}
                        className="p-2 rounded-lg border border-white/5 hover:border-accent-500/30 hover:bg-accent-600/10 text-slate-400 hover:text-accent-400 transition-all cursor-pointer"
                        title="View Verification"
                        data-cursor="LINK"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {cert.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] font-medium font-matrix px-2 py-0.5 rounded bg-slate-950/30 dark:bg-white/5 border border-white/5 text-slate-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Positions of Responsibility */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2 pl-2">
              <Briefcase className="text-accent-400" size={18} />
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-400">
                Positions of Responsibility
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {leadershipRoles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseMove={handleSpotlightMove}
                  onClick={() => playClick()}
                  data-cursor="CLICK"
                  className="bg-slate-950/20 glassmorphism p-6 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all duration-300 relative group overflow-hidden cursor-pointer"
                  style={{
                    '--spotlight-glow': 'rgba(6, 182, 212, 0.08)'
                  } as React.CSSProperties}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle 100px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-glow), transparent 80%)'
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start gap-4 mb-3.5">
                      <div className="flex gap-3 items-center">
                        <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 text-accent-400 group-hover:scale-105 transition-transform duration-300">
                          {role.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                            {role.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                            {role.organization}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold font-matrix text-accent-400 bg-accent-500/5 px-2 py-0.5 rounded border border-accent-500/10 shrink-0 mt-1">
                        {role.period}
                      </span>
                    </div>

                    <ul className="list-disc list-inside text-xs text-slate-400 leading-relaxed flex flex-col gap-1 pl-1">
                      {role.bullets.map((bullet, idx) => (
                        <li key={idx} className="marker:text-accent-500">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
