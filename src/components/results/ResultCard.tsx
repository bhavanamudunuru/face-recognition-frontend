/**
 * components/results/ResultCard.tsx
 * ------------------------------------
 * Displays the final face recognition result after backend processing.
 * Shows different icons and colors for each possible status.
 */
import { CheckCircle2, XCircle, AlertTriangle, Copy, ShieldAlert } from 'lucide-react'
import { FaceResult } from '../../types'

interface Props {
  result: FaceResult
}

const STATUS_CONFIG = {
  verified: {
    icon: <CheckCircle2 size={48} color="#22c55e" />,
    label: 'Verified',
    color: '#22c55e',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    textColor: '#166534',
  },
  registered: {
    icon: <CheckCircle2 size={48} color="#22c55e" />,
    label: 'Registered Successfully',
    color: '#22c55e',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    textColor: '#166534',
  },
  not_verified: {
    icon: <XCircle size={48} color="#ef4444" />,
    label: 'Not Verified',
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    textColor: '#991b1b',
  },
  liveness_failed: {
    icon: <ShieldAlert size={48} color="#f59e0b" />,
    label: 'Liveness Check Failed',
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    textColor: '#92400e',
  },
  duplicate: {
    icon: <Copy size={48} color="#8b5cf6" />,
    label: 'Duplicate Face Found',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    textColor: '#5b21b6',
  },
  poor_quality: {
    icon: <AlertTriangle size={48} color="#6b7280" />,
    label: 'Poor Image Quality',
    color: '#6b7280',
    bg: '#f9fafb',
    border: '#e5e7eb',
    textColor: '#374151',
  },
}

export default function ResultCard({ result }: Props) {
  const config = STATUS_CONFIG[result.status] || STATUS_CONFIG.poor_quality

  return (
    <div style={{
      padding: 32,
      borderRadius: 16,
      background: config.bg,
      border: `2px solid ${config.border}`,
      textAlign: 'center',
      maxWidth: 480,
      margin: '0 auto',
    }}>
      <div style={{ marginBottom: 16 }}>{config.icon}</div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: config.textColor, marginBottom: 8 }}>
        {config.label}
      </h2>

      <p style={{ fontSize: 14, color: config.textColor, opacity: 0.8, marginBottom: 16, lineHeight: 1.5 }}>
        {result.message}
      </p>

      {result.confidence !== undefined && result.confidence !== null && (
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: 999,
          background: 'white',
          border: `1px solid ${config.border}`,
          fontSize: 13,
          fontWeight: 600,
          color: config.textColor,
        }}>
          Match Confidence: {result.confidence.toFixed(1)}%
        </div>
      )}

      {result.duplicate_user_id && (
        <p style={{ marginTop: 12, fontSize: 12, color: config.textColor, opacity: 0.7 }}>
          Matches existing user: {result.duplicate_user_id}
        </p>
      )}
    </div>
  )
}
