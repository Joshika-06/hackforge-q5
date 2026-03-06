"use client"

import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Source {
  text: string
  score: number
}

interface EvidenceListProps {
  sources: Source[]
  className?: string
}

export function EvidenceList({ sources, className }: EvidenceListProps) {
  return (
    <Card className={cn("border-border/50 shadow-lg", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
            <FileText className="h-4 w-4 text-secondary-foreground" />
          </div>
          Retrieved Medical Records
          <Badge variant="secondary" className="ml-auto font-normal">
            {sources.length} sources
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sources.map((source, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Source {index + 1}
              </span>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  source.score >= 0.8 
                    ? "border-green-500/50 bg-green-500/10 text-green-700" 
                    : source.score >= 0.6
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-700"
                    : "border-border"
                )}
              >
                {Math.round(source.score * 100)}% match
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">{source.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
