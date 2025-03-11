"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ColorfulBackground() {
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

      {/* Subtle animated blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gray-700/10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{ type: "spring", damping: 50 }}
        style={{ top: "10%", left: "20%" }}
      />

      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-gray-800/10 blur-3xl"
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: "spring", damping: 50 }}
        style={{ top: "40%", right: "10%" }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gray-600/10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{ type: "spring", damping: 50 }}
        style={{ bottom: "10%", left: "30%" }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  )
}

