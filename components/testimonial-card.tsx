"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  avatarUrl: string
  quote: string
  delay?: number
}

export function TestimonialCard({ name, role, avatarUrl, quote, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-safari-sand/20 transition-all duration-300 hover:border-safari-sand hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-safari-sand/20 bg-muted shadow-sm">
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt={name}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <CardDescription>{role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-4">
          <Quote className="absolute -left-1 -top-1 h-8 w-8 text-safari-sand/20" />
          <p className="pl-4 italic text-muted-foreground">{quote}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

