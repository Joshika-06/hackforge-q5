import { Activity, Database, Brain, Shield, Zap, Code2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const technologies = [
  {
    icon: Brain,
    title: "Large Language Models",
    description: "Advanced AI models process and understand complex medical terminology and symptom descriptions.",
  },
  {
    icon: Database,
    title: "Vector Database",
    description: "Medical records and knowledge are stored in a vector database for efficient semantic retrieval.",
  },
  {
    icon: Zap,
    title: "RAG Architecture",
    description: "Retrieval-Augmented Generation combines retrieval and generation for accurate responses.",
  },
  {
    icon: Shield,
    title: "Trust Scoring",
    description: "Confidence metrics based on retrieval similarity help assess the reliability of results.",
  },
]

const teamFeatures = [
  {
    icon: Code2,
    title: "Open Source",
    description: "Built with modern open-source technologies including Next.js, React, and Python.",
  },
  {
    icon: Activity,
    title: "Hackathon Project",
    description: "Developed as a demonstration of AI capabilities in healthcare assistance.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <Activity className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            About HealthAI
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            An AI-powered healthcare assistant that leverages cutting-edge Retrieval-Augmented 
            Generation (RAG) technology to analyze symptoms and provide evidence-based medical insights.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {technologies.map((tech, index) => (
              <Card key={index} className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <tech.icon className="h-5 w-5 text-primary" />
                    </div>
                    {tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section className="mb-16">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            The Analysis Process
          </h2>
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </span>
                <div>
                  <h3 className="mb-1 font-heading font-semibold text-foreground">
                    Symptom Input
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You describe your symptoms in natural language through our intuitive interface.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </span>
                <div>
                  <h3 className="mb-1 font-heading font-semibold text-foreground">
                    Knowledge Retrieval
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The system searches a vector database of medical records to find relevant information.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </span>
                <div>
                  <h3 className="mb-1 font-heading font-semibold text-foreground">
                    AI Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    An LLM processes your symptoms along with retrieved medical context to generate insights.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </span>
                <div>
                  <h3 className="mb-1 font-heading font-semibold text-foreground">
                    Results & Evidence
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You receive an analysis with confidence scores and the source evidence used.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Project Info */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            Project Information
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {teamFeatures.map((feature, index) => (
              <Card key={index} className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                      <feature.icon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <h3 className="mb-2 font-heading font-semibold text-foreground">
            Important Disclaimer
          </h3>
          <p className="text-sm text-muted-foreground">
            This AI healthcare assistant is designed for educational and informational purposes only. 
            It does not provide medical diagnoses, treatment recommendations, or replace professional 
            medical advice. Always consult with a qualified healthcare provider for any medical concerns.
          </p>
        </div>
      </main>
    </div>
  )
}
