/**
 * components/layout/StatusBar.tsx
 * ---------------------------------
 * Shows the current scan progress as a step-by-step status bar.
 */
import { ScanStatus } from '../../types'

interface Props {
  status: ScanStatus
}

const STEPS = [
  { key: 'camera_active', label: 'Camera Ready' },
  { key: 'captured', label: 'Face Captured' },
  { key: 'uploading', label: 'Uploading' },
  { key: 'scanning', label: 'AI Scanning' },
  { key: 'done', label: 'Done' },
]

const STATUS_ORDER = ['idle', 'camera_active', 'captured', 'uploading', 'scanning', 'done']

export default function StatusBar({ status }: Props) {
  const currentIndex = STATUS_ORDER.indexOf(status)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, justifyContent: 'center', margin: '20px 0' }}>
      {STEPS.map((step, i) => {
        const stepIndex = STATUS_ORDER.indexOf(step.key)
        const isCompleted = currentIndex > stepIndex
        const isActive = currentIndex === stepIndex

        return (
          <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isCompleted ? '#22c55e' : isActive ? '#3b82f6' : '#1f2937',
                border: `2px solid ${isCompleted ? '#22c55e' : isActive ? '#3b82f6' : '#374151'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 4px',
                fontSize: 11, color: 'white', fontWeight: 700,
              }}>
                {isCompleted ? '✓' : i + 1}
              </div>
              <p style={{ fontSize: 10, color: isActive ? '#3b82f6' : isCompleted ? '#22c55e' : '#6b7280', whiteSpace: 'nowrap' }}>
                {step.label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 40, height: 2,
                background: currentIndex > stepIndex ? '#22c55e' : '#1f2937',
                margin: '0 4px',
                marginBottom: 16,
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
