export interface QueryResponse {
  query: string
  answer: string
  trust_score: number
  sources: Array<{
    text: string
    score: number
  }>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function analyzeSymptoms(query: string): Promise<QueryResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText)
      throw new Error(`API request failed: ${errorText}`)
    }

    const data = await response.json()
    
    // Ensure the query is included in the response
    return {
      ...data,
      query: data.query || query,
    }
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.")
    }
    
    throw error
  }
}

// Storage keys for session management
export const STORAGE_KEYS = {
  DIAGNOSIS_RESULT: "diagnosisResult",
  LAST_QUERY: "lastQuery",
} as const

// Helper to store diagnosis result
export function storeDiagnosisResult(result: QueryResponse): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEYS.DIAGNOSIS_RESULT, JSON.stringify(result))
    sessionStorage.setItem(STORAGE_KEYS.LAST_QUERY, result.query)
  }
}

// Helper to retrieve diagnosis result
export function getDiagnosisResult(): QueryResponse | null {
  if (typeof window === "undefined") return null
  
  const stored = sessionStorage.getItem(STORAGE_KEYS.DIAGNOSIS_RESULT)
  if (!stored) return null
  
  try {
    return JSON.parse(stored) as QueryResponse
  } catch {
    return null
  }
}

// Helper to clear diagnosis result
export function clearDiagnosisResult(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEYS.DIAGNOSIS_RESULT)
    sessionStorage.removeItem(STORAGE_KEYS.LAST_QUERY)
  }
}
