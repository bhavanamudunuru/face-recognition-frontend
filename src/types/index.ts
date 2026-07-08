/**
 * types/index.ts
 * All shared TypeScript types for the face recognition app.
 */

export type ScanStatus =
  | 'idle'
  | 'camera_active'
  | 'captured'
  | 'uploading'
  | 'scanning'
  | 'done'

export type FaceResultStatus =
  | 'verified'
  | 'not_verified'
  | 'liveness_failed'
  | 'duplicate'
  | 'poor_quality'
  | 'registered'

export interface FaceResult {
  status: FaceResultStatus
  message: string
  confidence?: number
  duplicate_user_id?: string
}
