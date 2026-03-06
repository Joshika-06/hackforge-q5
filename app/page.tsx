"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, Brain, Database, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { LanguageSelector } from "@/components/language-selector"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced language models analyze your symptoms with medical knowledge",
  },
  {
    icon: Database,
    title: "RAG Technology",
    description: "Retrieval-augmented generation for accurate, evidence-based insights",
  },
  {
    icon: ShieldCheck,
    title: "Trust Scoring",
    description: "Confidence metrics help you understand the reliability of results",
  },
]

export default function HomePage() {
  const [language, setLanguage] = useState("en")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
            <div className="flex flex-col items-center text-center">
              {/* Language Selector */}
              <div className="mb-8">
                <LanguageSelector value={language} onValueChange={setLanguage} />
              </div>

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Title */}
              <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                <span className="text-balance">AI Healthcare Assistant</span>
              </h1>

              {/* Subtitle */}
              <p className="mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                Analyze your symptoms using advanced AI and medical knowledge retrieval. 
                Get evidence-based insights powered by state-of-the-art RAG technology.
              </p>

              {/* CTA Button */}
              <Link href="/diagnosis">
                <Button 
                  size="lg" 
                  className="gap-2 rounded-xl px-8 py-6 text-lg font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Start Diagnosis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/40 bg-secondary/30 py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Cutting-edge technology for better health insights
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-border/40 py-12">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <p className="text-sm text-muted-foreground">
              This AI assistant is for informational purposes only and does not replace professional medical advice.
              Always consult a healthcare provider for medical concerns.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
