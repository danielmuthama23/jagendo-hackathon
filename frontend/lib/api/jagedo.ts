import axios from 'axios'
import { getAuthToken } from '@/lib/auth'

interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || 'An unexpected error occurred',
      details: error.response?.data?.details,
    }
    
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    
    return Promise.reject(apiError)
  }
)