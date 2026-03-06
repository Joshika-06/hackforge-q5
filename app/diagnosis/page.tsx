"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Stethoscope, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { QueryInput } from "@/components/query-input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { analyzeSymptoms, type QueryResponse } from "@/lib/api"

export default function DiagnosisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response: QueryResponse = await analyzeSymptoms(query)
      
      // Store the response in sessionStorage to pass to results page
      sessionStorage.setItem("diagnosisResult", JSON.stringify(response))
      
      router.push("/results")
    } catch (err) {
      console.error("[v0] Error analyzing symptoms:", err)
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to connect to the analysis service. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Stethoscope className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Symptom Analysis
          </h1>
          <p className="text-muted-foreground">
            Describe your symptoms in detail for a more accurate analysis
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Query Input */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-lg md:p-8">
          <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-xl bg-secondary/50 p-6">
          <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">
            Tips for better results:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              Be specific about your symptoms and their duration
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              Mention any relevant medical history
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              Include information about when symptoms started
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
