import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Briefcase,
  Milestone,
  Cpu,
  User,
  Mail,
  FileText,
  Award,
} from "lucide-react";
import { useAudio } from "../../context/AudioContext";

interface LoadingScreenProps {
  onComplete: (target?: string) => void;
}

const timePhases = [
  {
    label: "Good Morning",
    sky: "linear-gradient(135deg, #082f3a 0%, #12626a 42%, #d88b4a 100%)",
    wash: "linear-gradient(115deg, rgba(250, 204, 21, 0) 16%, rgba(253, 186, 116, 0.2) 42%, rgba(45, 212, 191, 0.1) 58%, rgba(2, 6, 10, 0) 80%)",
    horizon:
      "linear-gradient(90deg, rgba(251, 191, 36, 0), rgba(251, 191, 36, 0.28), rgba(34, 211, 238, 0.08), rgba(251, 191, 36, 0))",
    particle: "rgba(254, 240, 138, 0.72)",
    particleGlow: "rgba(251, 191, 36, 0.42)",
    streak:
      "linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.42), transparent)",
    titleTint: "#fff7d6",
    modelGlow: "rgba(251, 191, 36, 0.14)",
  },
  {
    label: "Good Afternoon",
    sky: "linear-gradient(135deg, #064e5c 0%, #087b90 48%, #38bdf8 100%)",
    wash: "linear-gradient(115deg, rgba(20, 184, 166, 0) 18%, rgba(125, 211, 252, 0.18) 44%, rgba(34, 211, 238, 0.12) 58%, rgba(2, 6, 10, 0) 80%)",
    horizon:
      "linear-gradient(90deg, rgba(125, 211, 252, 0), rgba(125, 211, 252, 0.26), rgba(20, 184, 166, 0.12), rgba(125, 211, 252, 0))",
    particle: "rgba(165, 243, 252, 0.7)",
    particleGlow: "rgba(34, 211, 238, 0.38)",
    streak:
      "linear-gradient(90deg, transparent, rgba(165, 243, 252, 0.42), transparent)",
    titleTint: "#dffcff",
    modelGlow: "rgba(45, 212, 191, 0.14)",
  },
  {
    label: "Good Evening",
    sky: "linear-gradient(135deg, #130f2f 0%, #5f2542 48%, #c45a2f 100%)",
    wash: "linear-gradient(115deg, rgba(244, 114, 182, 0) 18%, rgba(251, 146, 60, 0.2) 42%, rgba(168, 85, 247, 0.12) 58%, rgba(2, 6, 10, 0) 80%)",
    horizon:
      "linear-gradient(90deg, rgba(251, 146, 60, 0), rgba(251, 146, 60, 0.3), rgba(168, 85, 247, 0.14), rgba(251, 146, 60, 0))",
    particle: "rgba(253, 186, 116, 0.72)",
    particleGlow: "rgba(249, 115, 22, 0.38)",
    streak:
      "linear-gradient(90deg, transparent, rgba(253, 186, 116, 0.4), transparent)",
    titleTint: "#ffead5",
    modelGlow: "rgba(251, 146, 60, 0.15)",
  },
  {
    label: "Good Night",
    sky: "linear-gradient(135deg, #020617 0%, #061627 52%, #0f172a 100%)",
    wash: "linear-gradient(115deg, rgba(20, 184, 166, 0) 18%, rgba(56, 189, 248, 0.12) 42%, rgba(99, 102, 241, 0.1) 58%, rgba(2, 6, 10, 0) 80%)",
    horizon:
      "linear-gradient(90deg, rgba(34, 211, 238, 0), rgba(34, 211, 238, 0.22), rgba(99, 102, 241, 0.12), rgba(34, 211, 238, 0))",
    particle: "rgba(186, 230, 253, 0.76)",
    particleGlow: "rgba(125, 211, 252, 0.36)",
    streak:
      "linear-gradient(90deg, transparent, rgba(186, 230, 253, 0.34), transparent)",
    titleTint: "#dbeafe",
    modelGlow: "rgba(45, 212, 191, 0.12)",
  },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { playClick, playSuccess } = useAudio();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModelHovered, setIsModelHovered] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const activePhase = timePhases[phaseIndex];

  useEffect(() => {
    const cycle = window.setInterval(() => {
      setPhaseIndex((current) => (current + 1) % timePhases.length);
    }, 6500);

    return () => window.clearInterval(cycle);
  }, []);

  const handleOptionClick = (target: string) => {
    playSuccess();
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(target);
    }, 1200);
  };

  // Pre-generate background particles to avoid re-renders
  const [particles] = useState(() =>
    Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dx: Math.random() * 60 - 30,
      travel: Math.random() * 180 + 90,
      duration: Math.random() * 18 + 16,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.2 + 0.08,
    })),
  );

  const [lightStreaks] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 220 + 120,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * -12,
      opacity: Math.random() * 0.18 + 0.08,
    })),
  );

  const navItems = [
    { label: "Start Journey", target: "home", icon: <Compass size={14} /> },
    { label: "About", target: "about", icon: <User size={14} /> },
    { label: "Projects", target: "projects", icon: <Briefcase size={14} /> },
    {
      label: "Experience",
      target: "experience",
      icon: <Milestone size={14} />,
    },
    { label: "Skills", target: "skills", icon: <Cpu size={14} /> },
    {
      label: "Achievements",
      target: "achievements",
      icon: <Award size={14} />,
    },
    { label: "Contact", target: "contact", icon: <Mail size={14} /> },
    { label: "Resume", target: "resume", icon: <FileText size={14} /> },
  ];

  return (
    <div className="loading-screen-container fixed inset-0 z-[99999] flex flex-col items-center justify-between py-8 px-6 bg-[#03080c] select-none overflow-hidden">
      {/* Time-of-day sky gradient */}
      <motion.div
        animate={{ background: activePhase.sky }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="absolute inset-0 bg-[#02060a]/35 pointer-events-none z-0" />

      {/* Morphing background nebula blobs for rich moving depth */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[80vw] h-[80vw] rounded-full bg-teal-900/10 filter blur-[140px] pointer-events-none top-[-15%] left-[-15%] z-0"
      />
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[70vw] h-[70vw] rounded-full bg-blue-950/15 filter blur-[140px] pointer-events-none bottom-[-15%] right-[-15%] z-0"
      />

      {/* Slow-moving elegant dot grid for digital operating system look */}
      <div
        className="absolute inset-0 grid-dots opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundPosition: "center",
        }}
      />

      {/* Animated digital light streaks for background depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {lightStreaks.map((streak) => (
          <motion.div
            key={streak.id}
            className="absolute h-px"
            style={{
              left: `${streak.x}%`,
              top: `${streak.y}%`,
              width: streak.width,
              opacity: streak.opacity,
              background: activePhase.streak,
              transform: "rotate(-18deg)",
            }}
            animate={{
              x: [-80, 140],
              opacity: [0, streak.opacity, 0],
            }}
            transition={{
              duration: streak.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: streak.delay,
            }}
          />
        ))}
      </div>

      {/* Soft atmospheric wash behind avatar */}
      <motion.div
        animate={{
          opacity: [0.22, 0.36, 0.22],
          background: activePhase.wash,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          background: { duration: 2.4, ease: "easeInOut" },
          backgroundPosition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundSize: "220% 220%",
        }}
      />

      {/* Animated horizon shimmer */}
      <motion.div
        animate={{
          x: ["-14%", "14%", "-14%"],
          opacity: [0.18, 0.34, 0.18],
          background: activePhase.horizon,
        }}
        transition={{
          background: { duration: 2.4, ease: "easeInOut" },
          x: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute left-1/2 top-[46%] h-px w-[72vw] -translate-x-1/2 pointer-events-none z-0 blur-[1px]"
      />

      {/* Phase label - positioned so it doesn't overlap title on mobile */}
      <motion.div
        key={activePhase.label}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isTransitioning ? 0 : 0.36, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute right-4 sm:right-8 top-4 sm:top-8 z-10 pointer-events-none select-none"
      >
        <span
          className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] sm:tracking-[0.42em] font-display"
          style={{ color: activePhase.titleTint }}
        >
          {activePhase.label}
        </span>
      </motion.div>

      {/* Atmospheric drifting panels */}
      <motion.div
        animate={{
          x: ["-8%", "7%", "-8%"],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-[-10%] h-[36vh] w-[120vw] rotate-[-8deg] bg-white/10 blur-3xl pointer-events-none z-0"
      />

      {/* Ambient background floating stars with custom glow box-shadow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: activePhase.particle,
              boxShadow: `0 0 10px ${activePhase.particleGlow}`,
            }}
            animate={{
              y: [0, -p.travel, 0],
              x: [0, p.dx, 0],
              opacity: [0, p.opacity || 0.15, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main cinematic content container */}
      <motion.div
        animate={{
          scale: isTransitioning ? 1.35 : 1,
          opacity: isTransitioning ? 0 : 1,
        }}
        transition={{
          duration: 1.1,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="relative w-full h-full flex flex-col items-center justify-between z-10"
      >
        {/* Top Centered Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isTransitioning ? 0 : 0.4,
            y: isTransitioning ? -20 : 0,
          }}
          transition={{ delay: 0.3, duration: 1.0 }}
          className="z-10 mt-2 sm:mt-4 w-full text-center select-none pointer-events-none px-4"
        >
          <span
            className="text-[15px] sm:text-[20px] font-light font-sans tracking-[0.35em] sm:tracking-[0.45em] uppercase transition-colors duration-1000"
            style={{ color: activePhase.titleTint }}
          >
            Tanveer Singh's
          </span>
        </motion.div>

        {/* Center Canvas housing typography and character */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {/* Poster-style split typography behind avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: isTransitioning ? 0 : 1,
                scale: isTransitioning ? 0.85 : 1,
              }}
              transition={{ delay: 0.6, duration: 2.0 }}
              className="w-full max-w-[1560px] px-[3vw] flex items-center justify-center gap-[4vw] sm:gap-[6vw]"
              aria-hidden="true"
            >
              {["PORT", "FOLIO"].map((word) => (
                <span
                  key={word}
                  className="font-['Antonio'] text-[clamp(3.5rem,18vw,19rem)] font-black leading-[0.79] uppercase text-center tracking-[0.08em] sm:tracking-[0.1em]"
                  style={{
                    color: activePhase.titleTint,
                    opacity: 0.12,
                    textShadow: "0 10px 38px rgba(0, 0, 0, 0.38)",
                    WebkitTextStroke: "1px rgba(2, 6, 10, 0.2)",
                  }}
                >
                  {word}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Centered Ghibli Avatar Hero */}
          <motion.div
            initial={{ opacity: 0, y: -120, scale: 0.9 }}
            animate={{
              opacity: isTransitioning ? 0 : 1,
              y: isTransitioning ? 100 : 0,
              scale: isTransitioning ? 0.35 : 1,
            }}
            transition={{
              delay: isTransitioning ? 0 : 1.1,
              type: "spring",
              stiffness: 70,
              damping: 15,
            }}
            className="relative z-10 flex items-center justify-center h-[52vh] sm:h-[65vh] max-h-[480px] sm:max-h-[580px]"
          >
            {/* Centered avatar remains still after the entrance animation */}
            <motion.div
              onHoverStart={() => setIsModelHovered(true)}
              onHoverEnd={() => setIsModelHovered(false)}
              animate={{
                scale: isModelHovered ? 1.01 : 1,
                filter: isModelHovered
                  ? `brightness(1.04) saturate(1.04) drop-shadow(0 0 10px ${activePhase.modelGlow})`
                  : "brightness(1) saturate(1) drop-shadow(0 0 0px rgba(45, 212, 191, 0))",
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full cursor-pointer"
            >
              <img
                src="/user_avatar_3d.png"
                alt="Ghibli Character Avatar"
                className="relative z-10 h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] pointer-events-auto"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Horizontal Glass Dock Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 50 : 0,
          }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="z-20 w-full max-w-5xl px-3 sm:px-4 mb-2 sm:mb-4"
        >
          <div className="relative">
            <div className="relative w-max mx-auto glassmorphism bg-slate-950/15 backdrop-blur-xl border border-white/10 rounded-full p-1.5 sm:p-2 flex flex-row items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-visible">
              {navItems.map((item, idx) => {
                const isPrimary = item.target === "home";
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionClick(item.target)}
                    onMouseEnter={() => playClick()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2
    px-3 py-1.5 sm:px-4 sm:py-2 md:px-3.5 md:py-2.5
    rounded-full
    cursor-pointer
    whitespace-nowrap
    transition-all duration-200
    focus:outline-none
    ${
      isPrimary
        ? "bg-[#eae6df] text-[#0d212a] shadow-sm flex"
        : "hidden md:flex bg-transparent text-[#bfbfbf] hover:bg-[#1b1b1b] hover:text-[#ffffff] border border-transparent"
    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>

                    <span
                      className={
                        isPrimary
                          ? "inline text-[11px] sm:text-xs font-bold tracking-wide"
                          : "hidden lg:inline text-xs font-medium tracking-wide"
                      }
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
