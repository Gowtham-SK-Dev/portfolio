"use client"

import { motion } from "framer-motion"
import { Building, Calendar, MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceCardProps {
  title: string
  company: string
  location: string
  period: string
  description: string
  responsibilities: string[]
  gradientFrom: string
  gradientTo: string
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  responsibilities,
  gradientFrom,
  gradientTo,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
      ></div>
      <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl">
        <CardHeader className="border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle
                className={`text-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
              >
                {title}
              </CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <div className="flex items-center gap-1 text-gray-400">
                  <Building className="h-4 w-4" />
                  <span>{company}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-white bg-gradient-to-r ${gradientFrom} ${gradientTo} px-3 py-1 rounded-full shadow-sm`}
            >
              <Calendar className="h-4 w-4" />
              <span>{period}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6 text-gray-300">
          <p>{description}</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Key Responsibilities:</h4>
            <ul className="space-y-2 list-disc pl-5">
              {responsibilities.map((responsibility, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {responsibility}
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

