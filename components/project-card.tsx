"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, CheckCircle, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  period: string
  highlights?: string[]
  link?: string
  color: string
}

export function ProjectCard({ title, description, tags, image, period, highlights, link, color }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
      <Card className="flex flex-col h-full overflow-hidden group bg-white/5 backdrop-blur-sm border-transparent hover:border-primary/50 transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-15 z-10"></div>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>{period}</span>
          </div>
          <CardTitle className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4">{description}</p>

          {highlights && highlights.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="space-y-1">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle
                      className={`h-4 w-4 bg-gradient-to-r ${color} bg-clip-text text-transparent mt-0.5 shrink-0`}
                    />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:opacity-90 transition-all duration-300"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        {link && (
          <CardFooter className="mt-auto pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="sm"
                className={`bg-gradient-to-r ${color} text-white hover:opacity-80`}
              >
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

