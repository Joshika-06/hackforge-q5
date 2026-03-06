export interface QueryResponse {
  query: string
  answer: string
  trust_score: number
  sources: Array<{
    text: string
    score: number
  }>
}

export async function analyzeSymptoms(query: string): Promise<QueryResponse> {
  const response = await fetch("http://localhost:8000/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}
