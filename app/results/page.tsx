"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ResultCard } from "@/components/result-card"
import { TrustScore } from "@/components/trust-score"
import { EvidenceList } from "@/components/evidence-list"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { QueryResponse } from "@/lib/api"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<QueryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to get the result from sessionStorage
    const storedResult = sessionStorage.getItem("diagnosisResult")
    
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch (e) {
        console.error("[v0] Failed to parse stored result:", e)
      }
    }
    
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex max-w-4xl items-center justify-center px-4 py-20">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex max-w-4xl items-center justify-center px-4 py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
              No Results Found
            </h2>
            <p className="mb-6 text-muted-foreground">
              Please start a new diagnosis to see results.
            </p>
            <Link href="/diagnosis">
              <Button className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Start New Diagnosis
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Analysis Results
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Query:</span>
              <Badge variant="secondary" className="font-normal">
                {result.query}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link href="/diagnosis">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Analysis
              </Button>
            </Link>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Result - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ResultCard answer={result.answer} />
          </div>

          {/* Trust Score */}
          <div className="lg:col-span-1">
            <TrustScore score={result.trust_score} />
          </div>

          {/* Evidence List - full width */}
          <div className="lg:col-span-3">
            <EvidenceList sources={result.sources} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-border/50 bg-secondary/30 p-4 text-center text-sm text-muted-foreground">
          This analysis is for informational purposes only and should not replace professional medical advice.
          Please consult a healthcare provider for proper diagnosis and treatment.
        </div>
      </main>
    </div>
  )
}
