"use client"

import { Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TrustScoreProps {
  score: number
  className?: string
}

export function TrustScore({ score, className }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "[&>div]:bg-green-500"
    if (score >= 60) return "[&>div]:bg-amber-500"
    return "[&>div]:bg-red-500"
  }

  return (
    <Card className={cn("border-border/50 shadow-lg", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
            <Shield className="h-4 w-4 text-accent-foreground" />
          </div>
          Confidence Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">AI Confidence Level</span>
          <span className={cn("font-heading text-3xl font-bold", getScoreColor(score))}>
            {score}%
          </span>
        </div>
        <Progress 
          value={score} 
          className={cn("h-3 rounded-full bg-secondary", getProgressColor(score))} 
        />
        <p className="text-xs text-muted-foreground">
          Based on the relevance of retrieved medical records
        </p>
      </CardContent>
    </Card>
  )
}
