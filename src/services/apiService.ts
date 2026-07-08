/**
 * services/apiService.ts
 * All HTTP calls to the FastAPI backend.
 * Components never call fetch directly — they use this file.
 */
import { FaceResult } from '../types'

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'

async function post(endpoint: string, body: object): Promise<FaceResult> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `Server error: ${res.status}`)
  }
  return res.json()
}

export async function registerFace(userId: string, imageUrl: string): Promise<FaceResult> {
  return post('/api/register', { user_id: userId, image_url: imageUrl })
}

export async function verifyFace(userId: string, imageUrl: string): Promise<FaceResult> {
  return post('/api/verify', { user_id: userId, image_url: imageUrl })
}
