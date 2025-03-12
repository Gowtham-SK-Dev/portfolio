"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BackgroundGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0f0f13]"></div>

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-indigo-900/20 blur-[120px]"
        animate={{
          x: mousePosition.x * 0.02 - 400,
          y: mousePosition.y * 0.02 - 400,
        }}
        transition={{ type: "spring", damping: 50 }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[100px]"
        animate={{
          x: mousePosition.x * -0.02 + 300,
          y: mousePosition.y * -0.02 + 200,
        }}
        transition={{ type: "spring", damping: 50 }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[80px]"
        animate={{
          x: mousePosition.x * 0.01 - 200,
          y: mousePosition.y * 0.01 + 100,
        }}
        transition={{ type: "spring", damping: 50 }}
      />

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  )
}

