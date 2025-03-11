"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  highlightText: string
  className?: string
  highlightClassName?: string
}

export function AnimatedText({ text, highlightText, className, highlightClassName }: AnimatedTextProps) {
  // Split the text to highlight the specific part
  const parts = text.split(highlightText)
  const before = parts[0]
  const after = parts[1]

  return (
    <h1 className={className}>
      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {before}
      </motion.span>
      <motion.span
        className={highlightClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {highlightText}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {after}
      </motion.span>
    </h1>
  )
}

