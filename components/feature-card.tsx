"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  content: string
}

export function FeatureCard({ icon, title, description, content }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-safari-sand/20 transition-all duration-300 hover:border-safari-leaf/50 hover:shadow-lg dark:hover:border-safari-leaf/30">
        <div className="absolute inset-0 bg-gradient-to-br from-safari-leaf/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <CardHeader className="relative pb-0">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-xl bg-safari-leaf/10 text-safari-leaf transition-all duration-300 group-hover:bg-safari-leaf/20">
              {icon}
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-safari-leaf/20 to-transparent" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative pt-6">
          <p className="text-muted-foreground">{content}</p>
          <motion.div
            className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-safari-leaf to-safari-sand"
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

