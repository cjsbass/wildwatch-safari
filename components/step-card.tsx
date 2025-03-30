"use client"

import { motion } from "framer-motion"

interface StepCardProps {
  number: number
  title: string
  description: string
  isLast?: boolean
}

export function StepCard({ number, title, description, isLast = false }: StepCardProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-safari-leaf to-safari-leaf/80 text-3xl font-bold text-primary-foreground shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {number}
      </motion.div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>

      {!isLast && (
        <div className="absolute right-0 top-8 hidden h-0.5 w-full translate-x-1/2 md:block">
          <div className="h-full w-full bg-gradient-to-r from-safari-leaf/50 to-transparent" />
        </div>
      )}
    </motion.div>
  )
}

