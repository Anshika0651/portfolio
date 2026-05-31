"use client"

import { useEffect, useRef } from "react"

const GRID_SIZE = 20
const GRID_COLOR = "rgba(44, 24, 16, 0.08)"
const BG_COLOR = "#EDE8DF"
const RIPPLE_RADIUS = 120
const WARP_STRENGTH = 14
const LINE_STEP = 6

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export function GridRippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let animationId = 0

    const target = { x: -9999, y: -9999, active: false }
    const smooth = { x: -9999, y: -9999 }
    let influence = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const warpPoint = (x: number, y: number, mx: number, my: number, amount: number) => {
      if (amount <= 0.001) return { x, y }

      const dx = x - mx
      const dy = y - my
      const dist = Math.hypot(dx, dy)
      if (dist >= RIPPLE_RADIUS) return { x, y }

      const t = 1 - dist / RIPPLE_RADIUS
      const falloff = smoothstep(t) * amount
      const push = falloff * WARP_STRENGTH
      if (dist < 0.001) return { x, y }

      return {
        x: x + (dx / dist) * push,
        y: y + (dy / dist) * push,
      }
    }

    const drawWarpedLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      mx: number,
      my: number,
      amount: number
    ) => {
      const length = Math.hypot(x2 - x1, y2 - y1)
      const steps = Math.max(Math.ceil(length / LINE_STEP), 1)

      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const px = x1 + (x2 - x1) * t
        const py = y1 + (y2 - y1) * t
        const warped = warpPoint(px, py, mx, my, amount)
        if (i === 0) ctx.moveTo(warped.x, warped.y)
        else ctx.lineTo(warped.x, warped.y)
      }
      ctx.stroke()
    }

    const draw = () => {
      const followRate = target.active ? 0.2 : 0.1
      smooth.x += (target.x - smooth.x) * followRate
      smooth.y += (target.y - smooth.y) * followRate

      const targetInfluence = target.active ? 1 : 0
      const springRate = target.active ? 0.18 : 0.07
      influence += (targetInfluence - influence) * springRate

      ctx.fillStyle = BG_COLOR
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = GRID_COLOR
      ctx.lineWidth = 1
      ctx.lineCap = "butt"

      const mx = smooth.x
      const my = smooth.y

      for (let x = 0; x <= width; x += GRID_SIZE) {
        drawWarpedLine(x, 0, x, height, mx, my, influence)
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        drawWarpedLine(0, y, width, y, mx, my, influence)
      }

      animationId = requestAnimationFrame(draw)
    }

    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      target.active = true
    }

    const onMouseLeave = () => {
      target.active = false
    }

    resize()
    animationId = requestAnimationFrame(draw)

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    document.documentElement.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      document.documentElement.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
