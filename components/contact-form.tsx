"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  colors: {
    primary: string
    secondary: string
  }
}

export function ContactForm({ colors }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/5 backdrop-blur-sm p-6 rounded-lg shadow-lg"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div className="grid gap-6 sm:grid-cols-2" variants={itemVariants}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            required
            className="bg-white/10 border-transparent focus:border-primary transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            required
            className="bg-white/10 border-transparent focus:border-primary transition-all duration-300"
          />
        </div>
      </motion.div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="What is this regarding?"
          required
          className="bg-white/10 border-transparent focus:border-primary transition-all duration-300"
        />
      </motion.div>
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or inquiry..."
          className="min-h-[150px] bg-white/10 border-transparent focus:border-primary transition-all duration-300"
          required
        />
      </motion.div>
      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-90 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}

