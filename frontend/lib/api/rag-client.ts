import { api } from './jagedo'

interface RagRequest {
  query: string
  context?: Record<string, unknown>
  stream?: boolean
}

interface RagResponse {
  answer: string
  sources: string[]
  confidence: number
}

export class RagClient {
  private readonly endpoint = '/ai/query'

  async query(request: RagRequest): Promise<RagResponse> {
    try {
      const response = await api.post<RagResponse>(this.endpoint, request)
      return response.data
    } catch (error) {
      console.error('RAG query failed:', error)
      throw new Error('Failed to process your query')
    }
  }

  async *streamQuery(request: RagRequest): AsyncGenerator<string> {
    try {
      const response = await api.post(`${this.endpoint}/stream`, request, {
        responseType: 'stream',
      })

      const reader = response.data.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if done break
        yield decoder.decode(value)
      }
    } catch (error) {
      console.error('Streaming RAG query failed:', error)
      throw new Error('Failed to stream response')
    }
  }
}

export const ragClient = new RagClient()