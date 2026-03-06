"use client"

import { useState } from "react"
import { Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LoadingSpinner } from "@/components/loading-spinner"
import { cn } from "@/lib/utils"

interface QueryInputProps {
  onSubmit: (query: string) => void
  isLoading?: boolean
  className?: string
}

export function QueryInput({ onSubmit, isLoading = false, className }: QueryInputProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onSubmit(query.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <Textarea
          placeholder="Describe your symptoms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="min-h-[160px] resize-none rounded-xl border-border/50 bg-card p-4 pr-12 text-base shadow-sm transition-shadow focus:shadow-md"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Voice input</span>
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Example: I have dizziness and insomnia
      </p>

      <Button
        onClick={handleSubmit}
        disabled={!query.trim() || isLoading}
        size="lg"
        className="w-full gap-2 rounded-xl font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="text-primary-foreground" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Analyze Symptoms
          </>
        )}
      </Button>
    </div>
  )
}
