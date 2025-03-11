"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AnimateInViewProps {
  children: React.ReactNode
}

export function AnimateInView({ children }: AnimateInViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

