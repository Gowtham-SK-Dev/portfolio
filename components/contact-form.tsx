"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus("success")
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setFormStatus("error")
        toast({
          title: "Error",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setFormStatus("error")
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
    <motion.div className="relative group" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <motion.form
        onSubmit={handleSubmit}
        className="relative space-y-6 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20"
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="grid gap-6 sm:grid-cols-2" variants={itemVariants}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
        </motion.div>
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="subject" className="text-white">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            required
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-500 transition-all duration-300"
          />
        </motion.div>
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="message" className="text-white">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or inquiry..."
            className="min-h-[150px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-500 transition-all duration-300"
            required
          />
        </motion.div>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 border-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : formStatus === "success" ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Message Sent
              </>
            ) : formStatus === "error" ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4" /> Try Again
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Form submission note */}
        <motion.p className="text-xs text-center text-gray-400 mt-4" variants={itemVariants}>
          Your information will be securely stored and never shared with third parties.
        </motion.p>
      </motion.form>
    </motion.div>
  )
}

