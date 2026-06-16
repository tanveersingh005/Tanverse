import React, { useEffect, useRef } from 'react'
import { usePortfolioStore } from '../../store/usePortfolioStore'

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const accentHue = usePortfolioStore((state) => state.accentHue)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor((width * height) / 12000), 100) // Slightly tuned count
    const connectionDistance = 110
    const mouse = { x: -1000, y: -1000, radius: 140 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseSize: number
      alpha: number
      glow: boolean

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.size = Math.random() * 1.8 + 0.5
        this.baseSize = this.size
        this.alpha = Math.random() * 0.45 + 0.15
        this.glow = Math.random() > 0.8
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap around boundaries
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Mouse repelling physics
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distSq = dx * dx + dy * dy
        const radiusSq = mouse.radius * mouse.radius
        
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq)
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * force * 1.2
          this.y -= Math.sin(angle) * force * 1.2
          this.size = this.baseSize * (1 + force * 1.2)
        } else {
          if (this.size > this.baseSize) this.size -= 0.08
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${accentHue}, 80%, 60%, ${this.alpha})`
        ctx.fill()
        
        // Fast opacity-based particle glow overlay (15x faster than shadowBlur)
        if (this.glow) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${accentHue}, 80%, 60%, 0.06)`
          ctx.fill()
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles in proximity
    const drawConnections = () => {
      if (!ctx) return
      const connDistanceSq = connectionDistance * connectionDistance
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < connDistanceSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / connectionDistance) * 0.10
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(${accentHue}, 80%, 55%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    let isIntersecting = true

    const animate = () => {
      if (!isIntersecting) return
      
      ctx.clearRect(0, 0, width, height)
      
      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      drawConnections()

      animationFrameId = requestAnimationFrame(animate)
    }

    // Intersection Observer to completely pause updates and draws when hero scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersecting
        isIntersecting = entry.isIntersecting
        if (isIntersecting && !wasIntersecting) {
          animate()
        }
      },
      { threshold: 0.01 }
    )
    
    observer.observe(canvas)

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    animate()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [accentHue])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent transition-opacity duration-1000"
    />
  )
}
export default CanvasBackground
