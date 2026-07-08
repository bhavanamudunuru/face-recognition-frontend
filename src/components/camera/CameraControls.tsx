/**
 * components/camera/CameraControls.tsx
 * ---------------------------------------
 * Buttons for controlling the camera: Start, Capture, Retake, Submit.
 * Each button is shown/hidden based on the current scan status.
 */
import { Camera, ZapOff, RotateCcw, Send, Loader2 } from 'lucide-react'
import { ScanStatus } from '../../types'

interface Props {
  status: ScanStatus
  onStart: () => void
  onCapture: () => void
  onRetake: () => void
  onSubmit: () => void
  mode: 'register' | 'verify'
}

export default function CameraControls({ status, onStart, onCapture, onRetake, onSubmit, mode }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
      {/* Start Camera */}
      {status === 'idle' && (
        <button onClick={onStart} style={btnStyle('#22c55e')}>
          <Camera size={18} /> Start Camera
        </button>
      )}

      {/* Capture */}
      {status === 'camera_active' && (
        <button onClick={onCapture} style={btnStyle('#3b82f6')}>
          <Camera size={18} /> Capture Face
        </button>
      )}

      {/* Retake + Submit */}
      {status === 'captured' && (
        <>
          <button onClick={onRetake} style={btnStyle('#6b7280')}>
            <RotateCcw size={18} /> Retake
          </button>
          <button onClick={onSubmit} style={btnStyle('#8b5cf6')}>
            <Send size={18} /> {mode === 'register' ? 'Register Face' : 'Verify Face'}
          </button>
        </>
      )}

      {/* Loading states */}
      {(status === 'uploading' || status === 'scanning') && (
        <button disabled style={{ ...btnStyle('#6b7280'), opacity: 0.7, cursor: 'not-allowed' }}>
          <Loader2 size={18} className="spin" />
          {status === 'uploading' ? 'Uploading...' : 'Scanning...'}
        </button>
      )}

      {/* Done — try again */}
      {status === 'done' && (
        <button onClick={onRetake} style={btnStyle('#22c55e')}>
          <RotateCcw size={18} /> Scan Again
        </button>
      )}
    </div>
  )
}

function btnStyle(bg: string): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 10,
    background: bg,
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    border: 'none',
    cursor: 'pointer',
  }
}
