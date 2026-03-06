"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Lightbulb } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { QueryInput } from "@/components/query-input"
import { LanguageSelector } from "@/components/language-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { analyzeSymptoms, storeDiagnosisResult, type QueryResponse } from "@/lib/api"
import { cn } from "@/lib/utils"

const exampleSymptoms = [
  "Dizziness + Insomnia",
  "Chest pain + Fatigue",
  "Fever + Cough",
  "Headache + Nausea",
]

export default function DiagnosisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState("en")
  const [selectedExample, setSelectedExample] = useState<string | null>(null)

  const handleSubmit = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response: QueryResponse = await analyzeSymptoms(query)
      storeDiagnosisResult(response)
      router.push("/results")
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to connect to the analysis service. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setSelectedExample(example)
    // The QueryInput will be updated via the selected example
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto max-w-6xl px-4 pb-20 pt-24">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="animate-shake mx-auto mb-6 max-w-2xl border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Sidebar - Tips */}
          <div className="lg:col-span-2">
            <div className="glass sticky top-24 rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff]/10">
                  <Lightbulb className="h-4 w-4 text-[#00d4ff]" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  How to describe symptoms
                </h2>
              </div>
              
              <ul className="mb-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00d4ff]" />
                  Be specific about your symptoms and their duration
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00d4ff]" />
                  Mention any relevant medical history
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00d4ff]" />
                  Include information about when symptoms started
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00d4ff]" />
                  Describe severity on a scale if possible
                </li>
              </ul>
              
              <div className="mb-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Example queries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {exampleSymptoms.map((example) => (
                    <button
                      key={example}
                      onClick={() => handleExampleClick(example)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                        "border border-border hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]",
                        selectedExample === example && "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]"
                      )}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Language
                </h3>
                <LanguageSelector value={language} onValueChange={setLanguage} />
              </div>
            </div>
          </div>
          
          {/* Right Panel - Main Input */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="mb-2 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Symptom Analysis
              </h1>
              <p className="text-muted-foreground">
                Describe your symptoms in detail for a more accurate analysis
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6 md:p-8">
              <QueryInput 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                defaultValue={selectedExample || ""}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
