"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface FAQCardProps {
  question: string
  answer: string
  index: number
}

export function FAQCard({ question, answer, index }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card
        className={`overflow-hidden border-safari-sand/20 transition-all duration-300 ${isOpen ? "border-safari-leaf/50 shadow-md" : "hover:border-safari-sand/40"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardHeader className="cursor-pointer py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{question}</CardTitle>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </div>
        </CardHeader>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pb-4 pt-0">
                <p className="text-muted-foreground">{answer}</p>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

