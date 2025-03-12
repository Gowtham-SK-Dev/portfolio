"use client"

import type React from "react"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileNavProps {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  aboutRef: React.RefObject<HTMLElement>
  skillsRef: React.RefObject<HTMLElement>
  experienceRef: React.RefObject<HTMLElement>
  projectsRef: React.RefObject<HTMLElement>
  contactRef: React.RefObject<HTMLElement>
}

export function MobileNav({
  scrollToSection,
  aboutRef,
  skillsRef,
  experienceRef,
  projectsRef,
  contactRef,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (ref: React.RefObject<HTMLElement>) => {
    scrollToSection(ref)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-white focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg z-50"
          >
            <div className="flex flex-col p-4 space-y-4">
              <button
                onClick={() => handleNavigation(aboutRef)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-white/10 rounded-md transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation(skillsRef)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-white/10 rounded-md transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => handleNavigation(experienceRef)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-white/10 rounded-md transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => handleNavigation(projectsRef)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-white/10 rounded-md transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavigation(contactRef)}
                className="text-left px-4 py-2 text-gray-200 hover:bg-white/10 rounded-md transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation(contactRef)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

