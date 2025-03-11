"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  className?: string
  color: string
}

export function SkillBadge({ name, className, color }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-sm`,
          className,
        )}
      >
        {name}
      </div>
    </motion.div>
  )
}

