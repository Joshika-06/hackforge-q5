"use client"

import { Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ResultCardProps {
  answer: string
  className?: string
}

export function ResultCard({ answer, className }: ResultCardProps) {
  return (
    <Card className={cn("border-border/50 shadow-lg", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          Possible Medical Explanation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-foreground/90">{answer}</p>
      </CardContent>
    </Card>
  )
}
