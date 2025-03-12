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
  gradientFrom: string
  gradientTo: string
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  period,
  highlights,
  link,
  gradientFrom,
  gradientTo,
}: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }} className="h-full">
      <div className="relative h-full group">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
        ></div>
        <Card className="relative flex flex-col h-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl">
          <div className="aspect-video relative overflow-hidden rounded-t-xl">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-30 z-10 group-hover:opacity-20 transition-opacity duration-300`}
            ></div>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{period}</span>
            </div>
            <CardTitle className="text-white group-hover:text-gray-300 transition-colors">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-300 mb-4">{description}</p>

            {highlights && highlights.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-white">Key Features:</h4>
                <ul className="space-y-1">
                  {highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle
                        className={`h-4 w-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent mt-0.5 shrink-0`}
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
                    className="bg-white/10 backdrop-blur-sm text-gray-200 border-white/20 hover:bg-white/20 transition-all duration-300"
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
                  className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white border-0 hover:opacity-90`}
                >
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </CardFooter>
          )}
        </Card>
      </div>
    </motion.div>
  )
}

