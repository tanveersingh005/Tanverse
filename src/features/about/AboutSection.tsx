import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'


// Emitters of counting state on intersection view
const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let startTimestamp: number | null = null
    let animationFrameId: number
    let hasAnimated = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / 1500, 1) // 1.5s duration
            setCount(Math.floor(progress * value))
            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step)
            }
          }
          animationFrameId = requestAnimationFrame(step)
        }
      },
      { threshold: 0.1 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [value])

  return (
    <div 
      ref={countRef} 
      className="bg-slate-950/20 glassmorphism p-7 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center h-full min-h-[132px] hover:border-accent-500/30 hover:shadow-lg dark:hover:shadow-accent-500/5 hover:-translate-y-1 transition-all duration-300 flex-shrink-0 min-w-[170px] sm:min-w-0"
    >
      <div className="text-4xl font-black font-display text-accent-400">
        {count}{suffix}
      </div>
      <div className="text-[10px] font-bold font-sans uppercase text-slate-500 tracking-wider mt-1.5 leading-tight">
        {label}
      </div>
    </div>
  )
}

// 3D Parallax skew/tilt card on cursor moves
const TiltCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    
    // Max 12 degrees tilt
    setRotateX(-y / (box.height / 15))
    setRotateY(x / (box.width / 15))
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      whileHover={{ y: -6, borderColor: 'var(--accent-400)' }}
      className="bg-slate-950/20 glassmorphism p-7 rounded-2xl border border-white/5 flex flex-col gap-5 min-h-[236px] shadow-lg transition-all duration-300 relative group overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background card glow hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 via-accent-500/0 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-accent-500/0 to-accent-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon with slight tilt rotation on hover */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 w-fit text-accent-300 group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300 shadow-inner">
        {icon}
      </div>
      <h4 className="text-base font-bold text-slate-100 font-display">
        {title}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  )
}

export const AboutSection: React.FC = () => {
  // Stagger reveal animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 22, stiffness: 100 }
    }
  }

  return (
    <section
      id="about"
      className="relative w-full py-24 px-6 border-b border-white/5 bg-[#0a0a0c] overflow-hidden"
    >
      {/* Morphing background nebula blobs for rich moving depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -35, 35, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute w-[450px] h-[450px] rounded-full bg-teal-950/8 filter blur-[120px] top-[10%] left-[5%] z-0"
        />
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-blue-950/10 filter blur-[120px] bottom-[20%] right-[5%] z-0"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center md:text-left"
        >
          <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent-400">
            01 &bull; ABOUT ME
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 font-display mt-3 leading-tight">
            Building Products,
            <br />
            Not Just Projects.
          </h2>
          <div className="h-0.5 w-12 bg-accent-500 mt-4 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_auto_1fr] gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Narrative & Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-10 max-w-[600px]"
          >
            {/* Story Paragraphs */}
            <div className="flex flex-col gap-5 text-sm text-slate-400 leading-relaxed">
              <motion.p variants={itemVariants} className="text-slate-200 font-medium text-base">
                Hi, I'm Tanveer Singh, a Full Stack Developer and Data Scientist , passionate about transforming ambitious ideas into scalable digital products.
              </motion.p>
            
              <motion.p variants={itemVariants}>
                Currently pursuing Computer Science while actively building production-ready applications, participating in hackathons, leading placement initiatives, and continuously exploring emerging technologies.
              </motion.p>
              
              {/* Engineering philosophy list */}
              <motion.div variants={itemVariants} className="mt-2 border-l-2 border-accent-500/40 pl-4 flex flex-col gap-1.5 py-1">
                <div className="text-2xs font-bold font-display uppercase tracking-widest text-slate-500">My philosophy is simple:</div>
                <div className="font-semibold text-slate-200 text-xs tracking-wider uppercase font-display flex flex-col gap-1 mt-1">
                  <span>Build with purpose.</span>
                  <span>Learn relentlessly.</span>
                  <span>Ship quality.</span>
                </div>
              </motion.div>
            </div>

            {/* Impact Stats (Horizontal scrollable chips on mobile, grid on larger viewports) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 md:pb-0 scrollbar-none w-full"
            >
              <AnimatedCounter value={400} suffix="+" label="DSA Solved" />
              <AnimatedCounter value={5} suffix="+" label="Prod Projects" />
              <AnimatedCounter value={5} suffix="+" label="Hackathons" />
              <AnimatedCounter value={2000} suffix="+" label="Students Impacted" />
              <AnimatedCounter value={12} suffix="+" label="Components Built" />
              <AnimatedCounter value={50} suffix="+" label="Reqs Analyzed" />
            </motion.div>
          </motion.div>

          {/* Central Vertical Pulsing Line (Visible only on desktop lg) */}
          <div className="hidden lg:block w-px self-stretch relative bg-white/5">
            <motion.div
              animate={{
                opacity: [0.25, 0.75, 0.25],
                scaleY: [0.75, 1, 0.75]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/40 to-transparent w-full origin-center"
            />
          </div>

          {/* Right Column: Engineering Pillars Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-[500px]"
          >
            <TiltCard 
              icon="💻"
              title="Full Stack Development"
              desc="Building scalable applications with React, Node.js, modern APIs, databases, and production-ready architecture."
            />
            <TiltCard 
              icon="🎨"
              title="Creative Tech & Analytics"
              desc="Blending data-driven product insights with high-fidelity animations, custom layouts, and interactive developer engineering."
            />
            <TiltCard 
              icon="📊"
              title="Product Thinking"
              desc="Understanding user problems, prioritizing features, analyzing feedback, and building solutions that deliver measurable value."
            />
            <TiltCard 
              icon="🚀"
              title="Leadership & Growth"
              desc="Leading initiatives, collaborating across teams, participating in hackathons, and continuously improving through learning."
            />
          </motion.div>
        </div>

        {/* Bottom Quote */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 1.0 }}
          className="mt-24 text-center max-w-2xl mx-auto border-t border-white/5 pt-12"
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-slate-300/80 leading-relaxed tracking-wide">
            "I don't just write code—I build experiences that people remember."
          </p>
        </motion.div> */}

      </div>
    </section>
  )
}

export default AboutSection
