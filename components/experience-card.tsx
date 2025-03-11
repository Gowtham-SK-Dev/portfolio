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
  color: string
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  responsibilities,
  color,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm border-transparent hover:border-primary/50">
        <CardHeader className={`border-b border-muted/20`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle className="text-xl bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
                {title}
              </CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{company}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white bg-gradient-to-r from-gray-700 to-gray-900 px-3 py-1 rounded-full shadow-sm">
              <Calendar className="h-4 w-4" />
              <span>{period}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p>{description}</p>
          <div className="space-y-2">
            <h4 className="font-semibold">Key Responsibilities:</h4>
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

